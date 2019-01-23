import { Component } from "@angular/core";
import { RegisterPage } from "../register/register";
import { NavController, NavParams, LoadingController, Loading } from "ionic-angular";
import { RegisterProfilePage } from "../../../user/pages/register-profile/register-profile";
import { AuthProvider } from "../../../../providers/auth/auth";
import { TokenStorage } from "../../../../providers/token/token";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";

@Component({
  selector: "check-verification-code",
  templateUrl: "check-verification-code.html"
})
export class CheckVerificationCodePage {
  headerImageUrl = "../../assets/imgs/car-verify.png";
  headerTitle = "بررسی کد";

  codeInput0;
  codeInput1;
  codeInput2;
  codeInput3;
  codeInput4;
  codeInput5;

  mobileNumber;

  loading: Loading;

  timer = 59;
  interval;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public tokenStorage: TokenStorage
  ) {
    this.mobileNumber = this.navParams.get("mobileNumber");
    this.startCountdown();

    // just for dev mode
    const token = this.navParams.get("token");
    // this.showLoader();
    this.stopCountdown();

    let smsjwt$ = this.authProvider.verifySMSToken(this.mobileNumber, token);

        // smsjwt$.subscribe(async smsjwt => {
        //   if (smsjwt) {
        //     console.log("SMS Token(CodeVerification): ", smsjwt);
        //     await this.tokenStorage.setSMSToken(smsjwt.token);
        //     let user$ = await this.authProvider.authenticateByToken();
        //     user$.subscribe(async user => {
        //       if (user.success) {
        //         await this.tokenStorage.setAuthToken(user["token"]);
        //         this.navCtrl.push(VehicleMenuPage);
        //         this.dismissLoader();
        //       } else {
        //         this.navCtrl.push(RegisterProfilePage);
        //         console.log(user);
        //         this.dismissLoader();
        //       }
        //     });
        //   } else {
        //     // ToDo: show error message and back to register page
        //     console.log("Error(CodeVerification): ", smsjwt.msg);
        //     this.navCtrl.push(RegisterPage);
        //     this.dismissLoader();
        //   }
        // });

  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        return;
      }
      this.navCtrl.push(RegisterPage);
      clearInterval(this.interval);
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.interval);
  }

  isNumber(value) {
    // if (parseInt(value)) return true;
    // return false;
    return true;
  }

  updateList(nextElement: HTMLElement) {
    nextElement.focus();
  }

  navToLoginPage() {
    clearInterval(this.interval);
    this.navCtrl.push(RegisterPage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      showBackdrop: false
    });

    this.loading.present();
  }

  dismissLoader() {
    this.loading.dismiss();
  }

  getCode() {
    let code =
      this.codeInput0.toString() +
      this.codeInput1.toString() +
      this.codeInput2.toString() +
      this.codeInput3.toString() +
      this.codeInput4.toString() +
      this.codeInput5.toString();
    return code;
  }

  checkCode() {
    const code = this.getCode();

    this.showLoader();
    this.stopCountdown();

    let smsjwt$ = this.authProvider.verifySMSToken(this.mobileNumber, code);

    smsjwt$.subscribe(async smsjwt => {
      if (smsjwt) {
        console.log("SMS Token(CodeVerification): ", smsjwt);
        await this.tokenStorage.setSMSToken(smsjwt.token);
        let user$ = await this.authProvider.authenticateByToken();
        user$.subscribe(async user => {
          if (user.success) {
            await this.tokenStorage.setAuthToken(user["token"]);
            this.navCtrl.push(VehicleMenuPage);
            this.dismissLoader();
          } else {
            this.navCtrl.push(RegisterProfilePage);
            console.log(user);
            this.dismissLoader();
          }
        });
      } else {
        // ToDo: show error message and back to register page
        console.log("Error(CodeVerification): ", smsjwt.msg);
        this.navCtrl.push(RegisterPage);
        this.dismissLoader();
      }
    });
  }

  resendCode() {}
}
