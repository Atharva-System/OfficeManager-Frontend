import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCommonService } from 'src/app/core/auth/service/common/auth-common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { Regex } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public constant;
  
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
    private authCommonService: AuthCommonService,
  ) {
    this.initialization();
    this.constant = ConstantClass;
  }
  ngOnInit(): void {
    
  }

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

  get _signinForm() {
    return ConstantClass.signinForm.controls;
  }

  onSubmit() {
    
    localStorage.setItem('loggedIn', btoa(this.constant.signinForm.value.email));
    this.router.navigate(['dashboard']);
    this.authCommonService.isLoggedIn = atob(localStorage.getItem('loggedIn') || '');
    
    console.log(ConstantClass.signinForm.value);
    this.initialization();
  }
}
