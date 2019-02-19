import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from "../login/login";
import { AuthProvider } from "../../../../providers/auth/auth";
import { CheckVerificationCodePage } from "../check-verification-code/check-verification-code";

@Component({
  selector: "forget-password",
  templateUrl: "forget-password.html"
})
export class ForgetPasswordPage implements OnInit {
  headerImageUrl ="../../assets/imgs/car.png";
  headerTitle = "فراموشی رمز عبور";

  fgPassForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder, 
    public authProvider: AuthProvider
  ) {}

  ngOnInit() {
    this.fgPassForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })
  }

  getSMSToken() {
    console.log(this.fgPassForm.get("mobileNumber").value)
    // ToDo: handle this error
    if (this.fgPassForm.invalid) {
      console.log("invalid Mobile Number");
      return false;
    }

    const mobileNumber = this.fgPassForm.get("mobileNumber").value;
    let token;
    this.authProvider.getSMSToken(mobileNumber).subscribe(result => {
      console.log("SMS Token(register)", result.token.token);
      token = result.token.token;
      this.navCtrl.push(CheckVerificationCodePage, { mobileNumber, token });
    });

  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
