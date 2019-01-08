import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { NewFuelCostPage } from "../new-fuel-cost/new-fuel-cost";
import { VehicleMenuPage} from "../vehicle-menu/vehicle-menu";

@Component({
  selector: "fuel-costs",
  templateUrl: "fuel-costs.html"
})
export class FuelCostsPage {
  fuelPayments = [
    {
      date: "1397/1/1",
      litres: 30,
      cost: 30000,
      km: 3000,
      fuelStationName: "جایگاه آزادی"
    },
    {
      date: "1397/1/1",
      litres: 20,
      cost: 30000,
      km: 3000,
      fuelStationName: "جایگاه تهرانپارس"
    },
    {
      date: "1397/1/1",
      litres: 25,
      cost: 30000,
      km: 3000,
      fuelStationName: "جایگاه طرشت"
    },
    {
      date: "1397/1/1",
      litres: 35,
      cost: 30000,
      km: 3000,
      fuelStationName: "جایگاه آزادی"
    },
    {
      date: "1397/1/1",
      litres: 30,
      cost: 30000,
      km: 3000,
      fuelStationName: "جایگاه جیحون"
    },
    {
      date: "1397/1/1",
      litres: 20,
      cost: 30000,
      km: 3000,
      fuelStationName: "جایگاه شهرک غرب"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  addNewFuelCost() {
    const modal = this.modalCtrl.create(NewFuelCostPage);
    modal.present();
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
