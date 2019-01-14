import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { NewReceiptItems } from "../new-receipt-items/new-receipt-items";

@Component({
  selector: "repair-new-receipt",
  templateUrl: "repair-new-receipt.html"
})
export class RepairNewReceiptsPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  navToAddItems() {
    this.navCtrl.push(NewReceiptItems);
  }
}
