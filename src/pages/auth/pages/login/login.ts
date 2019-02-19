import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public tokenStorage: TokenStorage
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
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
    if(this.loginForm.invalid) {
      console.log("error")
      return false;
    }

    const mobileNumber = this.loginForm.get("mobileNumber").value;
    const password = this.loginForm.get("password").value;

    console.log(this.loginForm)
    console.log(password)
    this.authProvider
      .authenticateByPassword(mobileNumber, password)
      .subscribe(async (result: UserAPI) => {
        if (result.success) {
          // ToDo: store token
          console.log("Token(login): ", result.token);
          await this.tokenStorage.setAuthToken(result.token);

          // ToDo: get user account
          console.log("Account(login): ", result.user);

          this.navCtrl.push(VehicleMenuPage);
        } else {
          // ToDo: show an error message and clear inputs
          // ToDo: modify model for msg part
          console.log("Error while login(login): ", result["msg"]);
        }
      });
  }
}
