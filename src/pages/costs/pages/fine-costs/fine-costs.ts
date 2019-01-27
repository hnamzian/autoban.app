import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { NewFineCostPage } from "../new-fine-cost/new-fine-cost";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { FineCost, FineCostAPI } from "../../../../models/costs";

@Component({
  selector: "fine-costs",
  templateUrl: "fine-costs.html"
})
export class FineCostsPage {
  fines: FineCost[];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  addNewFineCost() {
    const modal = this.modalCtrl.create(NewFineCostPage);
    modal.present();
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
