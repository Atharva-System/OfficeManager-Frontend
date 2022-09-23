import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CustomToastrService } from '../../shared/services/toastr/custom-toastr.service';
import { CommonService } from '../../shared/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { APIs } from 'src/app/shared/constants/apis';
import { AuthService } from '../service/auth/auth.service';
import { LoginResponse } from '../models/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private commonService: CommonService,
    private customToastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    const token = localStorage.getItem(ConstantClass.token);

    if (token && !request.url.includes(APIs.loginApi)) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`),
      });
    }

    this.spinner.show();
    return next.handle(request).pipe(
      finalize(() => this.spinner.hide()),
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        let errorMessage = '';
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else if (error.status === 400) {
          if (error.error && error.error.errors.length > 0) {
            errorMessage = error.error.errors[0];
            if (errorMessage.includes(':')) {
              errorMessage = errorMessage.split(':')[1];
            }
          } else {
            errorMessage = error.error.message || error.message;
            if (errorMessage.includes(':')) {
              errorMessage = errorMessage.split(':')[1];
            }
          }
          this.customToastrService.showToastr(
            ConstantClass.notificationType.error,
            errorMessage
          );
          return throwError(() => error);
        } else if (error.status === 404) {
          this.customToastrService.showToastr(
            ConstantClass.notificationType.error,
            this.commonService.getTranslateData('MESSAGE.ERROR_404_LOGIN')
          );
          return throwError(() => error);
        } else {
          errorMessage =
            error.error instanceof ErrorEvent
              ? `Error: ${error.error.message}`
              : `Error Code: ${error.status},  Message: ${error.message}`;
          this.customToastrService.showToastr(
            ConstantClass.notificationType.error,
            errorMessage
          );
          return throwError(() => new Error(`Error: ${errorMessage}`));
        }
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((response: LoginResponse) => {
        request = this.addTokenHeader(request, response.data.accessToken);
        return next.handle(request);
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
