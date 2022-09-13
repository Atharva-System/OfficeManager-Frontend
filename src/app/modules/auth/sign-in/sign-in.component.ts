import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, LoginResponse } from 'src/app/core/auth/models/user';
import { AuthService } from 'src/app/core/auth/service/auth/auth.service';
import { CommonService } from 'src/app/core/shared/services/common/common.service';
import { CustomToastrService } from 'src/app/core/shared/services/toastr/custom-toastr.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { SVGs } from 'src/app/shared/constants/svgs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public constant;
  public routeConstant;
  public svgs;
  users: IUser[] = [];

  //Array of object for showing validation message in loop
  validationMessages = {
    employeeNo: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
    password: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private customToastrService: CustomToastrService,
    private commonService: CommonService
  ) {
    //Initialize signin form
    this.initialization();
    //constants
    this.constant = ConstantClass;
    this.routeConstant = RouterPathClass;
    this.svgs = SVGs;
  }

  ngOnInit(): void {}

  //Initialize signin form
  initialization() {
    ConstantClass.signinForm = this.formBuilder.group({
      employeeNo: ['', [ConstantClass.validators.required]],
      password: ['', [ConstantClass.validators.required]],
    });
  }

  //Get all controls
  get _signinForm() {
    return ConstantClass.signinForm.controls;
  }

  //On submit signin form
  onSubmit(val: any) {
    this.authService.login(val).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem(ConstantClass.token, response?.data);

        //Toastr notification on success
        this.customToastrService.showToastr(
          ConstantClass.notificationType.success,
          this.commonService.getTranslateData('MESSAGE.SUCCESS_LOGIN')
        );

        //To navigate to dashboard route
        this.router.navigate([RouterPathClass.dashboard]);
      },
      error: (e) => console.error(e),
    });
    //To clear data on form
    this.initialization();
  }
}
