import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VehicleCostsPage } from '../vehicle-costs/vehicle-costs';

@Component({
  selector: 'vehicle-menu',
  templateUrl: 'vehicle-menu.html'
})
export class VehicleMenuPage {

    constructor(public navCtrl: NavController) {

    }

    navToVehicleProfilePage() {

    }

    navToRepairsListPage() {

    }

    navToNotifsPage() {

    }

    navToPeriodicServicesPage() {

    }

    navToCostsPage() {
        this.navCtrl.push(VehicleCostsPage);
    }

    navToSettingsPage() {

    }

    navToReoprtsPage() {

    }

}
