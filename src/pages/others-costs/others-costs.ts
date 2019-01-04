import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { NewOthersCostPage } from "../new-others-cost/new-others-cost";
import { VehicleMenuPage } from "../vehicle-menu/vehicle-menu";
@Component({
  selector: "others-costs",
  templateUrl: "others-costs.html"
})
export class OthersCostsPage {
  finePayments = [
    {
      date: "1/1/1397",
      costType: "Double Parking",
      cost: 30000,
      location: "Mirdamad"
    },
    {
      date: "1/2/1397",
      costType: "Double Parking",
      cost: 30000,
      location: "Azadi Street"
    },
    {
      date: "1/3/1397",
      costType: "Double Parking",
      cost: 30000,
      location: "Enghelab"
    },
    {
      date: "1/4/1397",
      costType: "Double Parking",
      cost: 30000,
      location: "Tajris"
    },
    {
      date: "1/5/1397",
      costType: "Double Parking",
      cost: 30000,
      location: "Vanak Square"
    },
    {
      date: "1/6/1397",
      costType: "Double Parking",
      cost: 30000,
      location: "Azadi Station"
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
