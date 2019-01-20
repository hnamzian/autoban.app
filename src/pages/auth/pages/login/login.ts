import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { ForgetPasswordPage } from "../forget-password/forget-password";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { AuthProvider } from "../../../../providers/auth/auth";
import { TokenStorage } from "../../../../providers/token/token";
import { UserAPI } from "../../../../models/user";

@Component({
  selector: "login-page",
  templateUrl: "login.html"
})
export class LoginPage {
  headerImageUrl = "../../assets/imgs/car.png";
  headerTitle = "حساب کاربری";

  mobileNumber: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public tokenStorage: TokenStorage
  ) {}

  navToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  navToForgetPasswordPage() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  loginUser() {
    this.authProvider
      .authenticateByPassword(this.mobileNumber, this.password)
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
