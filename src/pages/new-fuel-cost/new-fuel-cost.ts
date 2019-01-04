import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";

@Component({
  selector: "new-fuel-cost",
  templateUrl: "new-fuel-cost.html"
})
export class NewFuelCostPage {
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addFuelCost() {
      
  }

}
