import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiCallService } from 'src/app/core/dashboard/services/api-call.service';
import { ApiService } from 'src/app/core/shared/services/api/api.service';
import { APIs } from 'src/app/shared/constants/apis';
import { environment } from 'src/environments/environment';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, public apiCall: ApiService) { }

  login(params:IUser) {
    return this.apiCall
      .post(
        APIs.loginApi,
        params
      );
  }

  // logout() {
  //   this.http
  //     .post<any>(
  //       `${environment.apiUrl}/users/revoke-token`,
  //       {},
  //       { withCredentials: true }
  //     )
  //     .subscribe();
  //   this.userSubject.next(null);
  //   //this.router.navigate(['/login']);
  //   this.router.navigate(['login'], {
  //     queryParams: { returnUrl: this.router.routerState.snapshot.url },
  //   });
  // }
}
