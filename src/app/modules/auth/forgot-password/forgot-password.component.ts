import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { SVGs } from 'src/app/shared/constants/svgs';
import { Regex } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public constant;
  public svgs;

  //Array of object for showing validation message in loop
  validationMessages = {
    email: [
      { type: ConstantClass.required, message: 'MESSAGE.REQUIRED' },
      { type: ConstantClass.pattern, message: 'MESSAGE.EMAIL_PATTERN' },
    ],
    // tnc: [
    //   { type: ConstantClass.required, message: 'MESSAGE.REQUIRED' },
    // ],
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    //Initialize ForgotPasswordForm form
    this.initialization();
    //constant
    this.constant = ConstantClass;
    this.svgs = SVGs;
  }

  ngOnInit(): void {}

  //Initialize ForgotPasswordForm form
  initialization() {
    ConstantClass.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          ConstantClass.validators.required,
          ConstantClass.validators.pattern(Regex.emailPattern),
        ],
      ],
      // tnc: [
      //   false,
      //   [ConstantClass.validators.requiredTrue],
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
