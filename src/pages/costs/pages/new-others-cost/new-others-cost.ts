import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { Cost } from "../../../../models/costs";
import moment from "moment";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";

@Component({
  selector: "new-others-cost",
  templateUrl: "new-others-cost.html"
})
export class NewOthersCostPage {
  selectedCar;
  othersCost = {} as Cost;

  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor(
    public viewCtrl: ViewController,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {
    this.initDatePicker();
  }

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();
  }

  initDatePicker() {
    this.startMax = moment()
      .subtract(622, "year")
      .format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async addCost() {
    this.othersCost.carId = this.selectedCar.id;
    console.log(this.othersCost);
    let fuel$ = await this.costsProvider.addOthersCost(this.othersCost)
    fuel$.subscribe(console.log)
  }
}
