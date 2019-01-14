import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterCarProfilePage } from '../../../car/pages/register-car-profile/register-car-profile'

@Component({
  selector: 'register-profile',
  templateUrl: 'register-profile.html'
})
export class RegisterProfilePage {

  constructor(public navCtrl: NavController) {

  }

  saveAndNavToCarProfile() {
    this.navCtrl.push(RegisterCarProfilePage)
  }

}
