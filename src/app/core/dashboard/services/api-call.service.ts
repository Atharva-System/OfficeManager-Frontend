import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  configUrl = 'https://reqres.in/api/users?';
  configUrl2 = 'https://api.github.com/repositories';

  constructor(private http: HttpClient) {}

  getConfig(query : string) {
    return this.http.get<any>(this.configUrl2 + query);
  }
}
