import { Component, ViewChild } from "@angular/core";
import { RegisterPage } from "../register/register";
import { NavController } from "ionic-angular";
@Component({
  selector: "check-verification-code",
  templateUrl: "check-verification-code.html"
})
export class CheckVerificationCodePage {
  // @ViewChild("digit1") digit1;
  // @ViewChild("digit2") digit2;
  // @ViewChild("digit3") digit3;
  // @ViewChild("digit4") digit4;
  // @ViewChild("digit5") digit5;

  codeInput0;
  codeInput1;
  codeInput2;
  codeInput3;
  codeInput4;
  codeInput5;

  timer = 10;
  interval;

  constructor(public navCtrl: NavController) {
    this.interval = setInterval(this.countdown, 1000);
  }

  countdown = () => {
    if (this.timer > 0) {
      this.timer--;
      return;
    }
    this.navCtrl.push(RegisterPage);
    clearInterval(this.interval);
  };

  updateList(nextElement: HTMLElement) {
    console.log(nextElement);
    nextElement.focus();
  }

  navToLoginPage() {
    clearInterval(this.interval);
    this.navCtrl.push(RegisterPage);
  }
}
