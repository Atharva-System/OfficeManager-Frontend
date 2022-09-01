import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/auth/models/user';
import { AuthCommonService } from 'src/app/core/auth/service/common/auth-common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { Regex } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public constant;
  public routeConstant;

  users: IUser[] = [];

  //Array of object for showing validation message in loop 
  validationMessages = {
    email: [
      { type: 'required', message: 'MESSAGE.REQUIRED' },
      { type: 'pattern', message: 'MESSAGE.EMAIL_PATTERN' },
    ],
    password: [
      { type: 'required', message: 'MESSAGE.REQUIRED' },
      { type: 'pattern', message: 'MESSAGE.EMAIL_PATTERN' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authCommonService: AuthCommonService
  ) {
    //Initialize signin form
    this.initialization();
    //constants 
    this.constant = ConstantClass;
    this.routeConstant = RouterPathClass;
  }

  ngOnInit(): void {}

  //Initialize signin form
  initialization() {
    ConstantClass.signinForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(Regex.emailPattern)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(Regex.passwordPattern)],
      ],
    });
  }

  //Get all controls
  get _signinForm() {
    return ConstantClass.signinForm.controls;
  }

  //On submit signin form
  onSubmit() {
    localStorage.setItem(
      'loggedIn',
      btoa(this.constant.signinForm.value.email)
    );
    this.authCommonService.isLoggedIn = atob(
      localStorage.getItem('loggedIn') || ''
    );

    //To navigate to dashboard route
    this.router.navigate([RouterPathClass.dashboard]);
    
    //User details object
    let user = {
      email : this._signinForm['email'].value,
      password : this._signinForm['password'].value
    }
    this.users.push(user);

    console.log(this.users);
    //To clear form data
    this.initialization();
  }
}
