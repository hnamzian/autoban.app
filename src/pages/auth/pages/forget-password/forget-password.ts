import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LoginPage } from "../login/login";

@Component({
  selector: "forget-password",
  templateUrl: "forget-password.html"
})
export class ForgetPasswordPage {
  headerImageUrl ="../../assets/imgs/car.png";
  headerTitle = "فراموشی رمز عبور";

  constructor(public navCtrl: NavController) {}

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
