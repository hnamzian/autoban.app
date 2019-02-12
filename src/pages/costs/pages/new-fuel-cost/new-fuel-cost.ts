import { Component, OnInit } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { Cost } from "../../../../models/costs";
import moment from "moment";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";

@Component({
  selector: "new-fuel-cost",
  templateUrl: "new-fuel-cost.html"
})
export class NewFuelCostPage implements OnInit {
  selectedCar: Car;
  fuelCost = {} as Cost;
  stationName;
  odometer;

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

  async addFuelCost() {
    this.fuelCost.carId = this.selectedCar.id;
    console.log(this.fuelCost);
    let fuel$ = await this.costsProvider.addFuelCost(this.fuelCost, this.stationName, this.odometer)
    fuel$.subscribe(console.log)
  }
}
