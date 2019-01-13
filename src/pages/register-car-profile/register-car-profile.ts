import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
@Component({
  selector: "register-car-profile",
  templateUrl: "register-car-profile.html"
})
export class RegisterCarProfilePage {

  brands = ["پراید", "پیکان", "پژو", "نیسان", "رنو"];

  trims = ["آبی", "قرمز", "سبز", "سفید", "مشکی"];

  constructor(public navCtrl: NavController) {}

}
