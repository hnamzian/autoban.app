import { Component, OnInit } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Cost } from "../../../../models/costs";
import moment from "moment";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";

@Component({
  selector: "new-fine-cost",
  templateUrl: "new-fine-cost.html"
})
export class NewFineCostPage implements OnInit {
  selectedCar: Car;
  fineCost = {} as Cost;
  fineCategoryCode;

  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor(
    public viewCtrl: ViewController,
    public costsProvider: CostsProvider,
    public carStorgae: CarStorage
  ) {
    this.startMax = moment()
      .subtract(622, "year")
      .format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }

  async ngOnInit() {
    this.selectedCar = await this.carStorgae.getSelectedCar();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async addFineCost() {
    this.fineCost.carId = this.selectedCar.id;
    
    let fine$ = await this.costsProvider.addFineCost(this.fineCost, this.fineCategoryCode);
    fine$.subscribe(result => {
      if (result.success) {
        console.log(result);
        this.viewCtrl.dismiss({ fine: result.fine });
      }
    });
  }
}
