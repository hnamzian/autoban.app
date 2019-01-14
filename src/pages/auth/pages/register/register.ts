import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterProfilePage } from '../../../user/pages/register-profile/register-profile';
import { CheckVerificationCodePage } from "../check-verification-code/check-verification-code"

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController) {

  }

  registerUser() {
    this.navCtrl.push(RegisterProfilePage)
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  sendCode() {
    this.navCtrl.push(CheckVerificationCodePage);
  }

}
