import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { VehiclesListPage } from "../vehicles-list/vehicles-list";
@Component({
  selector: "register-car-profile",
  templateUrl: "register-car-profile.html"
})
export class RegisterCarProfilePage {

  brands = ["Pride", "Paykan", "Peugeot", "Nissan"];

  trims = ["blue", "red", "green", "white", "black"];

  constructor(public navCtrl: NavController) {}

  registerCar() {
    this.navCtrl.push(VehiclesListPage)
  }
}
