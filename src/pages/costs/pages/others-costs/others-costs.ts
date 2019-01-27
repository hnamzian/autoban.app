import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";

@Component({
  selector: "others-costs",
  templateUrl: "others-costs.html"
})

// period, type, cost, date, comment
// معاینه فنی - بیمه شخص ثالث - بیمه بدنه - وام - سایر
export class OthersCostsPage {
  othersPayments = [
    {
      date: "1/1/1397",
      cost: 30000,
      title: "روکش صندلی"
    },
    {
      date: "1/2/1397",
      cost: 30000,
      title: "رینگ"
    },
    {
      date: "1/3/1397",
      cost: 30000,
      title: "لاستیک"
    },
    {
      date: "1/4/1397",
      cost: 30000,
      title: "کارواش"
    },
    {
      date: "1/5/1397",
      cost: 30000,
      title: "بوگیر"
    }
  ];

  constructor(public navCtrl: NavController) {}

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
