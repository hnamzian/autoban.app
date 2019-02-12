import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Car } from "../../../../models/car";
import { PeriodicCost } from "../../../../models/costs";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";
import moment from "moment";

@Component({
  selector: "periodic-costs",
  templateUrl: "periodic-costs.html"
})

// period, type, cost, date, comment
// معاینه فنی - بیمه شخص ثالث - بیمه بدنه - وام - سایر
export class PeriodicCostsPage {
  selectedCar: Car;
  periodicCosts: PeriodicCost[];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let periodicCost$ = await this.costsProvider.getPeriodicCosts(this.selectedCar.id);
    periodicCost$.subscribe(result => {
      console.log(result);

      this.periodicCosts = result.periodicCosts;
      this.periodicCosts = this.periodicCosts.map(costItem => {
        costItem.cost.date = moment(costItem.cost.date).format("YYYY-MM-DD");
        return costItem;
      });
    });
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
