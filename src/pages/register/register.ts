import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterProfilePage } from '../register-profile/register-profile';

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController) {

  }

  registerUser() {
    this.navCtrl.push(RegisterProfilePage)
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

}
