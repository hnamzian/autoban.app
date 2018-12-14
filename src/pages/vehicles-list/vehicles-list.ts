import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VehicleMenuPage } from '../vehicle-menu/vehicle-menu';

@Component({
  selector: 'vehicles-list',
  templateUrl: 'vehicles-list.html'
})
export class VehiclesListPage {

    cars = [
        { tag: "Shaparak", brand: "SAIPA", model: "Pride", builtDate: "1389", imageUrl: "../../assets/imgs/samand.png" },
        { tag: "Zombie", brand: "IranKhodro", model: "Samand", builtDate: "1395", imageUrl: "../../assets/imgs/paykan.jpg" }
    ]

    constructor(public navCtrl: NavController) {

    }

    openMenu() {
        console.log("dlfdkfjbdkjf")
        this.navCtrl.push(VehicleMenuPage);
    }

}
