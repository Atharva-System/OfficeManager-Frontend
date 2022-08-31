import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  exports : [SignInComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
