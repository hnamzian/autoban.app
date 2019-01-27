import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
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
export class VehicleCostsPage implements OnInit {
  title = "هزینه ها";

  activatedTab = "Fuel";

  fuelCostsPage = FuelCostsPage;
  fineCostsPage = FineCostsPage;
  othersCostsPage = OthersCostsPage;
  periodicCostsPage = PeriodicCostsPage;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {}

  async ngOnInit() {}

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
      const popover = this.popoverCtrl.create(NewFuelCostPage, {}, { cssClass: "costPopover" });
      popover.present();
    } else if (this.activatedTab == "Fine") {
      const popover = this.popoverCtrl.create(NewFineCostPage, {}, { cssClass: "costPopover" });
      popover.present();
    } else if (this.activatedTab == "Others") {
      const popover = this.popoverCtrl.create(NewOthersCostPage, {}, { cssClass: "costPopover" });
      popover.present();
    } else if (this.activatedTab == "Periodic") {
      const popover = this.popoverCtrl.create(NewPeriodicCostPage, {}, { cssClass: "costPopover" });
      popover.present();
    }
  }
}
