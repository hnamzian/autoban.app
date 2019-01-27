import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { map, catchError } from "rxjs/operators";
import { RegisterCarProfilePage } from "../../../car/pages/register-car-profile/register-car-profile";
import { RegisterPage } from "../../../auth/pages/register/register";
import { LoginPage } from "../../../auth/pages/login/login";
import { UserProvider } from "../../../../providers/user/user";
import { AuthProvider } from "../../../../providers/auth/auth";
import { User } from "../../../../models/user";

@Component({
  selector: "register-profile",
  templateUrl: "register-profile.html"
})
export class RegisterProfilePage implements OnInit {
  headerImageUrl = "../../assets/imgs/person.png";
  headerTitle = "اطلاعات شخصی";

  user = {} as User;
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
    let userapi$ = await this.userProvider.registerUser(this.user, this.password);
    userapi$.subscribe(userapi => {
      console.log(userapi);

      if (!userapi) {
        this.navCtrl.push(RegisterPage);
      } else if (!userapi.success) {
        this.navCtrl.push(LoginPage);
      } else {
        this.authProvider.tokenStorage.setAuthToken(userapi.token);
        this.navCtrl.push(RegisterCarProfilePage);
      }
    });
  }
}
