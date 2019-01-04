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
      fineType: "Double Parking",
      cost: 30000,
      location: "Mirdamad"
    },
    {
      date: "1/2/1397",
      fineType: "Double Parking",
      cost: 30000,
      location: "Azadi Street"
    },
    {
      date: "1/3/1397",
      fineType: "Double Parking",
      cost: 30000,
      location: "Enghelab"
    },
    {
      date: "1/4/1397",
      fineType: "Double Parking",
      cost: 30000,
      location: "Tajris"
    },
    {
      date: "1/5/1397",
      fineType: "Double Parking",
      cost: 30000,
      location: "Vanak Square"
    },
    {
      date: "1/6/1397",
      fineType: "Double Parking",
      cost: 30000,
      location: "Azadi Station"
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
