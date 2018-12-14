import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "fuel-costs",
  templateUrl: "fuel-costs.html"
})
export class FuelCostsPage {
  fuelPayments = [
    {
      date: "1/1/1397",
      litres: 30,
      cost: 30000,
      km: 3000,
      fuelStationName: "Azadi Station"
    },
    {
      date: "1/2/1397",
      litres: 20,
      cost: 30000,
      km: 3000,
      fuelStationName: "Tehranpars Station"
    },
    {
      date: "1/3/1397",
      litres: 25,
      cost: 30000,
      km: 3000,
      fuelStationName: "Tarasht Station"
    },
    {
      date: "1/4/1397",
      litres: 35,
      cost: 30000,
      km: 3000,
      fuelStationName: "Azadi Station"
    },
    {
      date: "1/5/1397",
      litres: 30,
      cost: 30000,
      km: 3000,
      fuelStationName: "Jayhoon Station"
    },
    {
      date: "1/6/1397",
      litres: 20,
      cost: 30000,
      km: 3000,
      fuelStationName: "Azadi Station"
    }
  ];

  constructor(public navCtrl: NavController) {}
}
