import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "vehicles-details",
  templateUrl: "vehicles-details.html"
})
export class VehicleDetailsPage {
  carInfo = {
    tag: "Shaparak",
    brand: "SAIPA",
    model: "Pride",
    builtDate: "1389",
    imageUrl: "../../assets/imgs/samand.png",
    pluck: "13983948",
    color: "Red",
    insuranceDate: ""
  };

  constructor(public navCtrl: NavController) {}
}
