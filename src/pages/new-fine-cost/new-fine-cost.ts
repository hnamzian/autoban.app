import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";

@Component({
  selector: "new-fine-cost",
  templateUrl: "new-fine-cost.html"
})
export class NewFineCostPage {
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addFineCost() {

  }

}
