import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "repair-data",
  templateUrl: "repair-data.html"
})
export class RepairDataPage {
  invoice = {
    parts: [
      {
        name: "Steering Wheel",
        manufacturer: "Pars",
        seller: "Iran Yadak",
        quantity: 1,
        unitPrice: 20000,
        date: "1/1/2019"
      },
      {
        name: "Gearbox",
        manufacturer: "Pars",
        seller: "Iran Yadak",
        quantity: 1,
        unitPrice: 120000,
        date: "1/1/2019"
      },
      {
        name: "Brake",
        manufacturer: "Pars",
        seller: "Iran Yadak",
        quantity: 1,
        unitPrice: 33000,
        date: "1/1/2019"
      },
      {
        name: "Wind shielder",
        manufacturer: "Pars",
        seller: "Iran Yadak",
        quantity: 1,
        unitPrice: 710000,
        date: "1/1/2019"
      },
      {
        name: "Cylender",
        manufacturer: "Pars",
        seller: "Iran Yadak",
        quantity: 1,
        unitPrice: 980000,
        date: "1/1/2019"
      }
    ],
    totalCost: 1250000
  };

  constructor(public navCtrl: NavController) {}
}
