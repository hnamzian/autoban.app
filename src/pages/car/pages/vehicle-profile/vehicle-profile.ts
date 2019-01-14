import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "vehicle-profile",
  templateUrl: "vehicle-profile.html"
})
export class VehicleProfilePage {
  car = {
    tag: "جیمی",
    builtYear: "1992",
    trim: "زرد",
    brand: "نیسان",
    model: "BOXi",
    odometer: "198303490",
    body: "92389374",
    imageUrl: "../../assets/imgs/jimmicar.jpg"
  };

  brands = ["پراید", "پیکان", "پژو", "نیسان", "رنو"];

  trims = ["آبی", "قرمز", "سبز", "سفید", "مشکی"];

  constructor(public navCtrl: NavController) {}
}
