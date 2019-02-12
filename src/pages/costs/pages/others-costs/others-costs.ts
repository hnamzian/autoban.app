import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";
import { OthersCost, Cost } from "../../../../models/costs";
import moment from "moment";

@Component({
  selector: "others-costs",
  templateUrl: "others-costs.html"
})

// period, type, cost, date, comment
// معاینه فنی - بیمه شخص ثالث - بیمه بدنه - وام - سایر
export class OthersCostsPage {
  selectedCar: Car;
  othersCosts: Cost[];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let fine$ = await this.costsProvider.getOthersCosts(this.selectedCar.id);
    fine$.subscribe(result => {
      console.log(result);

      this.othersCosts = result.costs;
      this.othersCosts = this.othersCosts.map(costItem => {
        costItem.date = moment(costItem.date).format("YYYY-MM-DD");
        return costItem;
      });
    });
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
