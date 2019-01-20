import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserProvider } from "../../../../providers/user/user";
import { User } from "../../../../models/user";

@Component({
  selector: "user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage implements OnInit {
    userAltImage = "../../../../assets/imgs/user.png"
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
    this.user = this.navParams.get("user");
    console.log(this.user);
  }

  async ngOnInit() {}
}
