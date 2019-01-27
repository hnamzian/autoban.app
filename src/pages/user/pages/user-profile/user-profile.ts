import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserProvider } from "../../../../providers/user/user";
import { User } from "../../../../models/user";
import { TokenStorage } from "../../../../storage/token/token";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";

@Component({
  selector: "user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  userAltImage = "../../../../assets/imgs/user.png";
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public tokenStorage: TokenStorage
  ) {
    this.user = this.navParams.get("user");
    console.log(this.user);
  }

  async updateProfile() {
    let user$ = await this.userProvider.updateUser(this.user);
    user$.subscribe(result => {
      if (!result.success) {
        // ToDo: alert error
        console.log(result.msg);
      }
      this.navCtrl.push(VehicleMenuPage)
    });
  }
}
