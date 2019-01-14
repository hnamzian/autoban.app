import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { LoginPage } from "./pages/login/login"
import { RegisterPage } from "./pages/register/register"
import { ForgetPasswordPage } from "./pages/forget-password/forget-password"
import { CheckVerificationCodePage } from "./pages/check-verification-code/check-verification-code"

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    LoginPage,
    RegisterPage,
    ForgetPasswordPage,
    CheckVerificationCodePage
  ],
  entryComponents: [
    LoginPage,
    RegisterPage,
    ForgetPasswordPage,
    CheckVerificationCodePage
  ]
})
export class AuthModule {}