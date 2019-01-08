import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FuelCostsPage } from '../fuel-costs/fuel-costs';
import { FineCostsPage } from '../fine-costs/fine-costs';
import { OthersCostsPage } from '../others-costs/others-costs';
import { NewFuelCostPage } from '../new-fuel-cost/new-fuel-cost';
import { NewFineCostPage } from '../new-fine-cost/new-fine-cost';
import { NewOthersCostPage } from '../new-others-cost/new-others-cost';

@Component({
  selector: 'vehicle-costs',
  templateUrl: 'vehicle-costs.html'
})
export class VehicleCostsPage {

    activatedTab = "Fuel"

    fuelCostsPage = FuelCostsPage;
    fineCostsPage = FineCostsPage;
    othersCostsPage = OthersCostsPage;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    }

    navToNewEmployee() {
        
    }

    activateFuelTab() {
        this.activatedTab = "Fuel"
        
    }

    activateFineTab() {
        this.activatedTab = "Fine"
    }

    activateOthersTab() {
        this.activatedTab = "Others"
    }

    addNewCost() {
        if (this.activatedTab == "Fuel") {
            const modal = this.modalCtrl.create(NewFuelCostPage, "", {cssClass: "modal-container"});
            modal.present();
        }
        else if (this.activatedTab == "Fine") {
            const modal = this.modalCtrl.create(NewFineCostPage);
            modal.present();
        }
        else if (this.activatedTab == "Others") {
            const modal = this.modalCtrl.create(NewOthersCostPage);
            modal.present();
        }
    }

}
