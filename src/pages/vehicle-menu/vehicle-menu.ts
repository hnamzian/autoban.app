import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { VehicleCostsPage } from "../vehicle-costs/vehicle-costs";
import { RepairsListPage } from "../repairs-list/repairs-list";
import { ServicesListPage } from "../services-list/services-list";

@Component({
  selector: "vehicle-menu",
  templateUrl: "vehicle-menu.html"
})
export class VehicleMenuPage {
  constructor(public navCtrl: NavController) {}

  navToVehicleProfilePage() {}

  navToRepairsListPage() {
    this.navCtrl.push(RepairsListPage);
  }

  navToNotifsPage() {}

  navToServicesPage() {
    this.navCtrl.push(ServicesListPage);
  }

  navToCostsPage() {
    this.navCtrl.push(VehicleCostsPage);
  }

  navToSettingsPage() {}

  navToReoprtsPage() {}
}
