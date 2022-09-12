import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { Regex } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public constant;

  //Array of object for showing validation message in loop 
  validationMessages = {
    email: [
      { type: 'required', message: 'MESSAGE.REQUIRED' },
      { type: 'pattern', message: 'MESSAGE.EMAIL_PATTERN' },
    ],
    // tnc: [
    //   { type: 'required', message: 'MESSAGE.REQUIRED' },
    // ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    //Initialize ForgotPasswordForm form
    this.initialization();
    //constant
    this.constant = ConstantClass;
  }

  ngOnInit(): void {}

  //Initialize ForgotPasswordForm form
  initialization() {
    ConstantClass.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(Regex.emailPattern)],
      ],
      // tnc: [
      //   false,
      //   [Validators.requiredTrue],
      // ],
    });
  }

  // To get all controls
  get _forgotPasswordForm() {
    return ConstantClass.forgotPasswordForm.controls;
  }

  // Onsubmit forgot-password form
  onSubmit() {
    //To navigate to auth route
    this.router.navigate([RouterPathClass.auth]);
    console.log(ConstantClass.forgotPasswordForm.value);
    // To clear form
    this.initialization();
  }
}
