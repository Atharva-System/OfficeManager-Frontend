import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/core/shared/services/api/api.service';
import { APIs } from 'src/app/shared/constants/apis';
import { ConstantClass } from 'src/app/shared/constants/constants';
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
        tap((data: LoginResponse) => this.doLoginUser(params.employeeNo, data))
      );
  }

  logout() {
    this.doLogoutUser();
  }

  refreshToken() {
    return this.apiCall
      .post(APIs.refreshTokenApi, {
        refreshToken: this.getRefreshToken(),
        currentToken: this.getToken(),
      })
      .pipe(
        tap((data: LoginResponse) => {
          this.storeTokens(data.data);
        })
      );
  }

  private doLoginUser(employeeNo: number, data: LoginResponse) {
    this.storeTokens(data.data);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(ConstantClass.refreshToken);
  }

  private getToken() {
    return localStorage.getItem(ConstantClass.token);
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
