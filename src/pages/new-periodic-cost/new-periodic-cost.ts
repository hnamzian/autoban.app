import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";

@Component({
  selector: "new-periodic-cost",
  templateUrl: "new-periodic-cost.html"
})
export class NewPeriodicCostPage {
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addFuelCost() {
      
  }

}