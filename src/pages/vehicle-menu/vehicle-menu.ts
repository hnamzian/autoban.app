import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { VehicleCostsPage } from "../costs/pages/vehicle-costs/vehicle-costs";
import { RepairsListPage } from "../repairs/pages/repairs-list/repairs-list";
import { ServicesListPage } from "../services/pages/services-list/services-list";
import { UserProfilePage } from "../user/pages/user-profile/user-profile";
import { VehicleProfilePage } from "../car/pages/vehicle-profile/vehicle-profile";
import { UserProvider } from "../../providers/user/user";
import { CarProvider } from "../../providers/car/car";
import { UserAPI, User } from "../../models/user";
import { CarAPI, Car } from "../../models/car";
import { Observable } from "rxjs";

@Component({
  selector: "vehicle-menu",
  templateUrl: "vehicle-menu.html"
})
export class VehicleMenuPage implements OnInit {

  userAltImage = "../../../../assets/imgs/user.png";
  carAltImage = "../../../../assets/imgs/car.svg"

  user$: Observable<UserAPI>;
  user: User;
  car$: Observable<CarAPI>;
  cars: Car[];

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public carProvider: CarProvider
  ) {}

  async ngOnInit() {
    this.user$ = await this.userProvider.getUser();
    this.user$.subscribe(result => {
      this.user = result.user;
      console.log(this.user);
    });

    this.car$ = await this.carProvider.getCrs();
    this.car$.subscribe(result => {
      this.cars = result.cars;
      console.log(this.cars);
    });
  }

  navToUserProfilePage() {
    this.navCtrl.push(UserProfilePage, { user: this.user });
  }

  navToVehicleProfilePage() {
    this.navCtrl.push(VehicleProfilePage, { cars: this.cars });
  }

  navToRepairsListPage() {
    this.navCtrl.push(RepairsListPage);
  }

  navToServicesPage() {
    this.navCtrl.push(ServicesListPage);
  }

  navToCostsPage() {
    this.navCtrl.push(VehicleCostsPage);
  }

  navToNotifsPage() {}

  navToSettingsPage() {}

  navToReoprtsPage() {}
}
