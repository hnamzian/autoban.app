import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FuelCostsPage } from '../fuel-costs/fuel-costs';
import { FineCostsPage } from '../fine-costs/fine-costs';
import { OthersCostsPage } from '../others-costs/others-costs';

@Component({
  selector: 'vehicle-costs',
  templateUrl: 'vehicle-costs.html'
})
export class VehicleCostsPage {

    fuelCostsPage = FuelCostsPage;
    fineCostsPage = FineCostsPage;
    othersCostsPage = OthersCostsPage;

    constructor(public navCtrl: NavController) {

    }

}
