import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { CheckVerificationCodePage } from "../check-verification-code/check-verification-code";
import { AuthProvider } from "../../../../providers/auth/auth";
import { TokenStorage } from "../../../../providers/token/token";
// import { SMSJWTAPI } from "../../../../models/sms-token";
// import { tokenKey } from "@angular/core/src/view";

@Component({
  selector: "register-page",
  templateUrl: "register.html"
})
export class RegisterPage {
  headerImageUrl = "../../assets/imgs/car-login.png";
  headerTitle = "ثبت نام";

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public tokenStorage: TokenStorage
  ) {}

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  getSMSToken(mobileNumber) {
    let token;

    if (!this.validateMobileNumber(mobileNumber)) {
      console.log("invalid Mobile Number");
      return false;
    }

    this.authProvider.getSMSToken(mobileNumber).subscribe(result => {
      console.log("SMS Token(register)", result.token.token);
      token = result.token.token;
      this.navCtrl.push(CheckVerificationCodePage, { mobileNumber, token });
    });

    // this.navCtrl.push(CheckVerificationCodePage, { mobileNumber, token });
  }

  validateMobileNumber(mobileNumber) {
    let phone = mobileNumber.toString().split("+98")[1];
    if (phone.length !== 10) return false;
    return true;
  }
}
