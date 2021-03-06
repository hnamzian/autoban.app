import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { AppVersion } from "@ionic-native/app-version";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RegisterPage } from "../pages/auth/pages/register/register";
import { RegisterCarProfilePage } from "../pages/car/pages/register-car-profile/register-car-profile";
import { RegisterProfilePage } from "../pages/user/pages/register-profile/register-profile";
import { VehicleMenuPage } from "../pages/vehicle-menu/vehicle-menu";
import { LoginPage } from "../pages/auth/pages/login/login";
import { CheckVerificationCodePage } from "../pages/auth/pages/check-verification-code/check-verification-code";
import { AuthProvider } from "../providers/auth/auth";
import { UserProvider } from "../providers/user/user";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    private appVersion: AppVersion,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authProvider: AuthProvider,
    userProvider: UserProvider
  ) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.appVersion
        .getAppName()
        .then(value => {
          console.log(value);
        })
        .catch(err => {
          alert(err);
        });
      //   const version = await appVersion.getVersionNumber();
      //   console.log("VERSION", version);

      let user$ = await userProvider.getUser();
      user$.subscribe(user => {
        if (user.success) {
          //   console.log(user);

          this.rootPage = VehicleMenuPage;
        } else {
          console.log("Not Registered");
          this.rootPage = RegisterPage;
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
