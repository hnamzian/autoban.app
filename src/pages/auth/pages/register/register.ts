import { Component, OnInit } from "@angular/core";
import { NavController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  toast: Toast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public authProvider: AuthProvider, public tokenStorage: TokenStorage) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  getSMSToken() {
    if (this.registerForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    const mobileNumber = this.registerForm.get("mobileNumber").value;
    let token;
    this.authProvider.getSMSToken(mobileNumber).subscribe(result => {
      if (result && result.success) {
        console.log("SMS Token(register)", result.token.token);
        token = result.token.token;
        this.navCtrl.push(CheckVerificationCodePage, { mobileNumber, token });
      } else if (result && !result.success) {
        return this.showToast(result.message);
      }
    },
    error => this.showToast("خطا در  برقراری ارتباط")
    );
  }

  formErrorCheck() {
    console.log(this.registerForm.get("mobileNumber"));

    const message = this.registerForm.get("mobileNumber").hasError("required")
      ? "شماره همراه الزامی است"
      : this.registerForm.get("mobileNumber").hasError("minlength")
      ? "شماره همراه نامعتبر است"
      : this.registerForm.get("mobileNumber").hasError("maxlength")
      ? "شماره همراه نامعتبر است"
      : "خطا";
    return message;
  }

  showToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: "bottom",
      duration: 2000,
      cssClass: "toast"
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }
}
