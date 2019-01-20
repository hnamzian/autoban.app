import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { RegisterCarProfilePage } from "../../../car/pages/register-car-profile/register-car-profile";
import { RegisterPage } from "../../../auth/pages/register/register";
import { LoginPage } from "../../../auth/pages/login/login";

import { UserProvider } from "../../../../providers/user/user";
import { AuthProvider } from "../../../../providers/auth/auth";

import { UserAPI } from "../../../../models/user";

@Component({
  selector: "register-profile",
  templateUrl: "register-profile.html"
})
export class RegisterProfilePage implements OnInit {
  user = {} as Account;
  password: string;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public authProvider: AuthProvider
  ) {}

  async ngOnInit() {
    // this.userProvider.getUser().subscribe(console.log);
    // this.authProvider.authenticateByToken().subscribe(user => {
    //   console.log(user);
    //   this.navCtrl.push(RegisterCarProfilePage);
    // });
  }

  async registerUser() {
    let subscription = await this.userProvider.registerUser(
      this.user,
      this.password
    );

    if (!subscription) {
      // ToDo: rare condition, show alert for not having SMS token
      this.navCtrl.push(RegisterPage);
    } else {
      subscription.subscribe(result => {
        console.log(result);
        if (result.success) {
          this.navCtrl.push(RegisterCarProfilePage);
        } else {
          // ToDo: alert user for error message (ex: have registered before)
          this.navCtrl.push(LoginPage);
        }
      });
    }
  }
}
