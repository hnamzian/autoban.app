import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { NewFineCostPage } from "../new-fine-cost/new-fine-cost";
import { VehicleMenuPage } from "../vehicle-menu/vehicle-menu";

@Component({
  selector: "fine-costs",
  templateUrl: "fine-costs.html"
})
export class FineCostsPage {
  finePayments = [
    {
      date: "1/1/1397",
      fineType: "پارک دوبل",
      cost: 30000,
      location: "میرداماد"
    },
    {
      date: "1/2/1397",
      fineType: "پار ک دوبل",
      cost: 30000,
      location: "خیابان آزادی"
    },
    {
      date: "1/3/1397",
      fineType: "ورود ممنوع",
      cost: 30000,
      location: "انقلاب"
    },
    {
      date: "1/4/1397",
      fineType: "سرعت غیر مجاز",
      cost: 30000,
      location: "تجریش"
    },
    {
      date: "1/5/1397",
      fineType: "پارک دوبل",
      cost: 30000,
      location: "میدان ونک"
    },
    {
      date: "1/6/1397",
      fineType: "ورود ممنوع",
      cost: 30000,
      location: "خیابان شنگرف"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  addNewFineCost() {
    const modal = this.modalCtrl.create(NewFineCostPage);
    modal.present();
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
