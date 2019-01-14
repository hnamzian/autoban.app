import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

    user = {
        firstName: "حسین",
        lastName: "نمازیان",
        email: "namazian87@gmail.com",
        imageUrl: "../../assets/imgs/hossein.jpg"
    }
  constructor(public navCtrl: NavController) {

  }

}
