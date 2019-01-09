import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { ForgetPasswordPage } from "../forget-password/forget-password";
import { CheckVerificationCodePage } from "../check-verification-code/check-verification-code";

@Component({
  selector: "login-page",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(public navCtrl: NavController) {}

  navToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  navToForgetPasswordPage() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  
}
