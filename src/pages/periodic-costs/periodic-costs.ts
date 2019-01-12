import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { NewOthersCostPage } from "../new-others-cost/new-others-cost";
import { VehicleMenuPage } from "../vehicle-menu/vehicle-menu";
@Component({
  selector: "periodic-costs",
  templateUrl: "periodic-costs.html"
})

// period, type, cost, date, comment
// معاینه فنی - بیمه شخص ثالث - بیمه بدنه - وام - سایر
export class PeriodicCostsPage {
  othersPayments = [
    {
      date: "1/1/1397",
      cost: 30000,
      type: "معاینه فنی",
      period: "6 ماه"
    },
    {
      date: "1/2/1397",
      cost: 30000,
      type: "بیمه بدنه",
      period: "1 سال"
    },
    {
      date: "1/3/1397",
      cost: 30000,
      type: "بیمه شخص ثالث",
      period: "6 ماه"
    },
    {
      date: "1/4/1397",
      cost: 30000,
      type: "وام",
      period: "1 ماه"
    },
    {
      date: "1/5/1397",
      cost: 30000,
      type: "سایر",
      period: "3 ماه"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  addNewCost() {
    const modal = this.modalCtrl.create(NewOthersCostPage);
    modal.present();
  }

  navToMenu() {
      this.navCtrl.push(VehicleMenuPage)
  }
}
