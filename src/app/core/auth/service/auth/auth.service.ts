import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ApiCallService } from 'src/app/core/dashboard/services/api-call.service';
import { ApiService } from 'src/app/core/shared/services/api/api.service';
import { APIs } from 'src/app/shared/constants/apis';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { environment } from 'src/environments/environment';
import { IUser, LoginResponse } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public apiCall: ApiService) {}

  login(params: IUser) {
    return this.apiCall
      .post(APIs.loginApi, params)
      .pipe(
        tap((tokens: LoginResponse) =>
          this.doLoginUser(params.employeeNo, tokens.data)
        )
      );
  }

  logout() {
    this.doLogoutUser();
  }

  refreshToken() {
    return this.apiCall
      .post(APIs.refreshTokenApi, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: LoginResponse) =>
          this.storeJwtToken(tokens.data.accessToken)
        )
      );
  }

  private doLoginUser(employeeNo: number, tokens: LoginResponse['data']) {
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(ConstantClass.refreshToken);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(ConstantClass.token, jwt);
  }

  private storeTokens(tokens: LoginResponse['data']) {
    localStorage.setItem(ConstantClass.token, tokens.accessToken);
    localStorage.setItem(ConstantClass.refreshToken, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(ConstantClass.token);
    localStorage.removeItem(ConstantClass.refreshToken);
  }
}
