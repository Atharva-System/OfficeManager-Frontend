import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api/api.service';
import { CustomToastrService } from '../../shared/services/toastr/custom-toastr.service';
import { CommonService } from '../../shared/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { APIs } from 'src/app/shared/constants/apis';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public api: ApiService,
    private commonService: CommonService,
    private customToastrService: CustomToastrService
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

    return next.handle(request).pipe(
      map((res: any) => {
        if (res.status === 200) {
          // console.log(res.body, 'Successfully loggedIn!');
        }

        return res;
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          // return this.handle401Error(request, next);
        } else if (error.status === 400) {
          this.customToastrService.showToastr(
            ConstantClass.notificationType.error,
            this.commonService.getTranslateData('MESSAGE.ERROR_LOGIN')
          );
          // console.log('Bad Request - Add correct employee no!');
        } else if (error.status === 404) {
          this.customToastrService.showToastr(
            ConstantClass.notificationType.error,
            this.commonService.getTranslateData('MESSAGE.ERROR_404_LOGIN')
          );
        } else {
          let errorMsg =
            error.error instanceof ErrorEvent
              ? `Error: ${error.error.message}`
              : `Error Code: ${error.status},  Message: ${error.message}`;
          this.customToastrService.showToastr(
            ConstantClass.notificationType.error,
            errorMsg
          );
        }
        return throwError(() => new Error(`Error: ${error.error.message}`));
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // return this.api.refreshToken().pipe(
    //     switchMap((response: any) => {
    //         localStorage['token'] = response.data;
    //         request = this.addTokenHeader(request, response.data);
    //         return next.handle(request);
    //     })
    // )
  }

  addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
