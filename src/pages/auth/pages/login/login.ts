import { Component, OnInit } from "@angular/core";
import { NavController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterPage } from "../register/register";
import { ForgetPasswordPage } from "../forget-password/forget-password";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { AuthProvider } from "../../../../providers/auth/auth";
import { TokenStorage } from "../../../../storage/token/token";
import { UserAPI } from "../../../../models/user";

@Component({
  selector: "login-page",
  templateUrl: "login.html"
})
export class LoginPage implements OnInit {
  headerImageUrl = "../../assets/imgs/car.png";
  headerTitle = "حساب کاربری";

  loginForm: FormGroup;

  toast: Toast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public authProvider: AuthProvider, public tokenStorage: TokenStorage) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  navToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  navToForgetPasswordPage() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  loginUser() {
    // ToDo: handle this error
    if (this.loginForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    const mobileNumber = this.loginForm.get("mobileNumber").value;
    const password = this.loginForm.get("password").value;

    console.log(this.loginForm);
    console.log(password);
    this.authProvider.authenticateByPassword(mobileNumber, password).subscribe(
      async (result: UserAPI) => {
        if (result && result.success) {
          await this.tokenStorage.setAuthToken(result.token);
          this.navCtrl.push(VehicleMenuPage);
          return this.showToast(result.message);
        } else {
          return this.showToast(result.message);
        }
      },
      error => this.showToast("خطا در  برقراری ارتباط")
    );
  }

  formErrorCheck() {
    const message = this.loginForm.get("mobileNumber").hasError("required")
      ? "شماره همراه الزامی است"
      : this.loginForm.get("mobileNumber").hasError("minlength")
      ? "شماره همراه نامعتبر است"
      : this.loginForm.get("mobileNumber").hasError("maxlength")
      ? "شماره همراه نامعتبر است"
      : this.loginForm.get("password").hasError("required")
      ? "رمز عبور الزامی است"
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
