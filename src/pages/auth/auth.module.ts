import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { LoginPage } from "./pages/login/login"
import { RegisterPage } from "./pages/register/register"
import { ForgetPasswordPage } from "./pages/forget-password/forget-password"
import { CheckVerificationCodePage } from "./pages/check-verification-code/check-verification-code"
import { RegisterProfilePage } from "./pages/register-profile/register-profile"
import { RegisterCarProfilePage } from "./pages/register-car-profile/register-car-profile"

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    LoginPage,
    RegisterPage,
    ForgetPasswordPage,
    CheckVerificationCodePage,
    RegisterCarProfilePage,
    RegisterProfilePage
  ],
  entryComponents: [
    LoginPage,
    RegisterPage,
    ForgetPasswordPage,
    CheckVerificationCodePage,
    RegisterCarProfilePage,
    RegisterProfilePage
  ]
})
export class AuthModule {}