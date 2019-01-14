import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RepairReceiptsPage } from '../repair-receipts/repair-receipts';

@Component({
  selector: "repair-card",
  templateUrl: "repair-card.html"
})
export class RepairCardPage {
  repairData = {
    date: "1/1/2019",
    garage: "Raghebi Garage",
    repairMan: "Asghari",
    title: "Engine Repair",
    cost: 2700000
  };

  constructor(public navCtrl: NavController) {}

  openReceipts() {
    this.navCtrl.push(RepairReceiptsPage)
  }

}
