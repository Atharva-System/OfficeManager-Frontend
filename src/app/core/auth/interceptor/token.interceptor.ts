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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public api: ApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token && !request.url.includes('Login')) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      map((res: any) => {
        if (res.status === 200) {
          // console.log(res.body);
        }
        return res;
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          // return this.handle401Error(request, next);
        }
        let errorMsg =
          error.error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : `Error Code: ${error.status},  Message: ${error.message}`;
        console.log(errorMsg);

        return throwError(() => new Error(errorMsg));
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
      headers: request.headers.set('Authorization', `bearer ${token}`),
    });
  }
}
