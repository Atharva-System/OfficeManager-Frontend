import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: RouterPathClass.auth, pathMatch: 'full' },
  {
    path: RouterPathClass.auth,
    component: AuthComponent,
    children : [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: RouterPathClass.forgotPassword,
        component: ForgotPasswordComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
