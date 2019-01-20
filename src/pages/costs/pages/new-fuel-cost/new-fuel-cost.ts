import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import moment from 'moment';

@Component({
  selector: "new-fuel-cost",
  templateUrl: "new-fuel-cost.html"
})
export class NewFuelCostPage {
  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.startMax = moment().subtract(622, 'year').format();
    // this.startMin = moment().format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addFuelCost() {}
}
