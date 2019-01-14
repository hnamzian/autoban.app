import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "repair-receipt-detail",
  templateUrl: "repair-receipt-detail.html"
})
export class RepairReceiptDetailPage {
  receipt = {
    imageUrl: "../../assets/imgs/receipt.jpg",
    tag: 'Engine Repair',
    totalCost: 2910000,
    date: '1/3/2018',
    items: [
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
    ]
  };
  constructor(public navCtrl: NavController) {}
}
