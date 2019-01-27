import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { OthersCost } from "../../../../models/costs";
import moment from "moment";

@Component({
  selector: "new-others-cost",
  templateUrl: "new-others-cost.html"
})
export class NewOthersCostPage {
  othersCost = {} as OthersCost;
  
  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.startMax = moment()
      .subtract(622, "year")
      .format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addCost() {}
}
