import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { FuelCostsPage } from "../fuel-costs/fuel-costs";
import { FineCostsPage } from "../fine-costs/fine-costs";
import { OthersCostsPage } from "../others-costs/others-costs";
import { PeriodicCostsPage } from "../periodic-costs/periodic-costs";
import { NewFuelCostPage } from "../new-fuel-cost/new-fuel-cost";
import { NewFineCostPage } from "../new-fine-cost/new-fine-cost";
import { NewOthersCostPage } from "../new-others-cost/new-others-cost";
import { NewPeriodicCostPage } from "../new-periodic-cost/new-periodic-cost";


@Component({
  selector: "vehicle-costs",
  templateUrl: "vehicle-costs.html"
})
export class VehicleCostsPage {
  activatedTab = "Fuel";

  fuelCostsPage = FuelCostsPage;
  fineCostsPage = FineCostsPage;
  othersCostsPage = OthersCostsPage;
  periodicCostsPage = PeriodicCostsPage;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    
  ) {
      
  }

  activateFuelTab() {
    this.activatedTab = "Fuel";
  }

  activateFineTab() {
    this.activatedTab = "Fine";
    console.log("fine");
  }

  activateOthersTab() {
    this.activatedTab = "Others";
    console.log("others");
  }

  activatePeriodicTab() {
    this.activatedTab = "Periodic";
    console.log("periodic");
  }

  addNewCost() {
    if (this.activatedTab == "Fuel") {
      const modal = this.modalCtrl.create(NewFuelCostPage);
      modal.present();
    } else if (this.activatedTab == "Fine") {
      const modal = this.modalCtrl.create(NewFineCostPage);
      modal.present();
    } else if (this.activatedTab == "Others") {
      const modal = this.modalCtrl.create(NewOthersCostPage);
      modal.present();
    } else if (this.activatedTab == "Periodic") {
      const modal = this.modalCtrl.create(NewPeriodicCostPage);
      modal.present();
    }
  }
}
