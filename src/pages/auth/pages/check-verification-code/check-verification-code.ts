import { Component } from "@angular/core";
import { RegisterPage } from "../register/register";
import { NavController, NavParams, LoadingController, Loading, ToastController, Toast } from "ionic-angular";
import { RegisterProfilePage } from "../../../user/pages/register-profile/register-profile";
import { AuthProvider } from "../../../../providers/auth/auth";
import { TokenStorage } from "../../../../storage/token/token";
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
  toast: Toast;

  timer = 59;
  interval;

  // ToDo: Handle validations and Erros

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authProvider: AuthProvider,
    public tokenStorage: TokenStorage
  ) {
    this.mobileNumber = this.navParams.get("mobileNumber");
    this.startCountdown();

    // just for dev mode
    const token = this.navParams.get("token");
    this.showToast(`Token: ${token}`);
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

  showToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: "top",
      duration: 20000
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }

  getCode() {
    let code = this.codeInput0.toString() + this.codeInput1.toString() + this.codeInput2.toString() + this.codeInput3.toString() + this.codeInput4.toString() + this.codeInput5.toString();
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
        console.log("Error(CodeVerification): ", smsjwt.message);
        this.navCtrl.push(RegisterPage);
        this.dismissLoader();
      }
    });
  }

  resendCode() {}
}
