import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";

@Component({
  selector: "new-others-cost",
  templateUrl: "new-others-cost.html"
})
export class NewOthersCostPage {
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addFuelCost() {
      
  }

}