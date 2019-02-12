import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { Cost } from "../../../../models/costs";
import moment from "moment";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";

@Component({
  selector: "new-periodic-cost",
  templateUrl: "new-periodic-cost.html"
})
export class NewPeriodicCostPage {
  selectedCar;
  periodicCost = {} as Cost;
  period;

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
    this.periodicCost.carId = this.selectedCar.id;
    // this.periodicCost.type = 1;
    console.log(this.periodicCost);
    let fuel$ = await this.costsProvider.addPeriodicCost(this.periodicCost, this.period)
    fuel$.subscribe(console.log)
  }
}
