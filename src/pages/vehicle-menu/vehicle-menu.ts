import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { VehicleCostsPage } from "../vehicle-costs/vehicle-costs";
import { RepairsListPage } from "../repairs-list/repairs-list";
import { ServicesListPage } from "../services-list/services-list";
import { UserProfilePage } from "../user-profile/user-profile";
import { VehicleProfilePage } from "../vehicle-profile/vehicle-profile";
// import { LoginService } from "../../services/login";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "vehicle-menu",
  templateUrl: "vehicle-menu.html"
})
export class VehicleMenuPage {
  constructor(public navCtrl: NavController, public http: HttpClient) {
    console.log("entered");
    let url = "https://jsonplaceholder.typicode.com/todos/1";
    this.http.get(url).subscribe(d => console.log(d))

    // this.loginService.getData()
  }

  navToUserProfilePage() {
    this.navCtrl.push(UserProfilePage)
  }

  navToVehicleProfilePage() {
      this.navCtrl.push(VehicleProfilePage)
  }

  navToRepairsListPage() {
    this.navCtrl.push(RepairsListPage);
  }

  navToNotifsPage() {}

  navToServicesPage() {
    this.navCtrl.push(ServicesListPage);
  }

  navToCostsPage() {
    this.navCtrl.push(VehicleCostsPage);
  }

  navToSettingsPage() {}

  navToReoprtsPage() {}
}
