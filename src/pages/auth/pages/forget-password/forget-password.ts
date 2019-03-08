import { Component, OnInit } from "@angular/core";
import { NavController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginPage } from "../login/login";
import { AuthProvider } from "../../../../providers/auth/auth";
import { CheckVerificationCodePage } from "../check-verification-code/check-verification-code";

@Component({
  selector: "forget-password",
  templateUrl: "forget-password.html"
})
export class ForgetPasswordPage implements OnInit {
  headerImageUrl = "../../assets/imgs/car.png";
  headerTitle = "فراموشی رمز عبور";

  fgPassForm: FormGroup;

  toast: Toast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public authProvider: AuthProvider) {}

  ngOnInit() {
    this.fgPassForm = this.formBuilder.group({
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  getSMSToken() {
    if (this.fgPassForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    const mobileNumber = this.fgPassForm.get("mobileNumber").value;
    let token;
    this.authProvider.getSMSToken(mobileNumber).subscribe(
      result => {
        if (result && result.success) {
          token = result.token.token;
          this.navCtrl.push(CheckVerificationCodePage, { mobileNumber, token });
          return this.showToast(result.message);
        } else if (result && !result.success) {
          return this.showToast(result.message);
        }
      },
      error => this.showToast("خطا در  برقراری ارتباط")
    );
  }

  formErrorCheck() {
    console.log(this.fgPassForm.get("mobileNumber"));

    const message = this.fgPassForm.get("mobileNumber").hasError("required")
      ? "شماره همراه الزامی است"
      : this.fgPassForm.get("mobileNumber").hasError("minlength")
      ? "شماره همراه نامعتبر است"
      : this.fgPassForm.get("mobileNumber").hasError("maxlength")
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

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
