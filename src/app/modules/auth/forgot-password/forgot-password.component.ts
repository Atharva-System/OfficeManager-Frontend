import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { Regex } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public constant;

  validationMessages = {
    email: [
      { type: 'required', message: 'MESSAGE.REQUIRED' },
      { type: 'pattern', message: 'MESSAGE.EMAIL_PATTERN' },
    ],
    tnc: [
      { type: 'required', message: 'MESSAGE.REQUIRED' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.initialization();
    this.constant = ConstantClass;
  }
  ngOnInit(): void {}

  initialization() {
    ConstantClass.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(Regex.emailPattern)],
      ],
      tnc: [
        '',
        [Validators.required],
      ],
    });
  }

  get _forgotPasswordForm() {
    return ConstantClass.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.router.navigate(['auth']);
    console.log(ConstantClass.forgotPasswordForm.value);
    this.initialization();
  }
}
