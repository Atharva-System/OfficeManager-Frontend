import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCommonService {
  isLoggedIn = '';

  constructor() {
    this.isLoggedIn = atob(localStorage.getItem('loggedIn') || '');
    console.log(this.isLoggedIn);  
   }
}
