import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from "../login/login";
import { CheckVerificationCodePage } from "../check-verification-code/check-verification-code";
import { AuthProvider } from "../../../../providers/auth/auth";
import { TokenStorage } from "../../../../storage/token/token";
// import { SMSJWTAPI } from "../../../../models/sms-token";
// import { tokenKey } from "@angular/core/src/view";

@Component({
  selector: "register-page",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit {
  headerImageUrl = "../../assets/imgs/car-login.png";
  headerTitle = "ثبت نام";

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public tokenStorage: TokenStorage
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  getSMSToken() {
    console.log(this.registerForm.get("mobileNumber").value)
    // ToDo: handle this error
    if (this.registerForm.invalid) {
      console.log("invalid Mobile Number");
      return false;
    }

    const mobileNumber = this.registerForm.get("mobileNumber").value;
    let token;
    this.authProvider.getSMSToken(mobileNumber).subscribe(result => {
      console.log("SMS Token(register)", result.token.token);
      token = result.token.token;
      this.navCtrl.push(CheckVerificationCodePage, { mobileNumber, token });
    });

  }
}
