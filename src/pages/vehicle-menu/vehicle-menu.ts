import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs";
import { VehicleCostsPage } from "../costs/pages/vehicle-costs/vehicle-costs";
import { RepairsListPage } from "../repairs/pages/repairs-list/repairs-list";
import { ServicesListPage } from "../services/pages/services-list/services-list";
import { UserProfilePage } from "../user/pages/user-profile/user-profile";
import { CarProfilePage } from "../car/pages/car-profile/car-profile";
import { UserProvider } from "../../providers/user/user";
import { CarProvider } from "../../providers/car/car";
import { UserStorage } from "../../storage/user/user";
import { CarStorage } from "../../storage/car/car";
import { UserAPI, User } from "../../models/user";
import { CarAPI, Car } from "../../models/car";
import { environment as env } from "../../config/environment.prod";

@Component({
  selector: "vehicle-menu",
  templateUrl: "vehicle-menu.html"
})
export class VehicleMenuPage implements OnInit {
  title = "اتوبان";
  user$: Observable<UserAPI>;
  car$: Observable<CarAPI>;
  user = {} as User;
  userPhoto;
  selectedCar = {} as Car;
  cars: Car[];

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public carProvider: CarProvider,
    public userStorage: UserStorage,
    public carStorage: CarStorage
  ) {}

  async ngOnInit() {
    await this.getUser();
    await this.getCars();
  }

  async getUser() {
    this.user$ = await this.userProvider.getUser();
    this.user$.subscribe(async result => {
      this.user = result.user;
      this.userPhoto = this.getUserImageUrl();
      await this.storeUser();
    });
  }

  async getCars() {
    this.car$ = await this.carProvider.getCrs();
    this.car$.subscribe(async result => {
      this.cars = result.cars;
      await this.storeCars();
    });
  }

  async storeUser() {
    await this.userStorage.setUser(this.user);
  }

  async storeCars() {
    await this.carStorage.setCars(this.cars);
  }

  async getSelectedCar() {
    this.selectedCar = await this.carStorage.getSelectedCar();
  }

  async updateSelectedCar(car) {
    await this.carStorage.setSelectedCar(car);
    this.selectedCar = car;
  }

  navToUserProfilePage() {
    this.navCtrl.push(UserProfilePage, { user: this.user });
  }

  async navToVehicleProfilePage() {
    await this.getSelectedCar();
    if (this.selectedCar.id) {
      console.log(this.selectedCar);
      this.navCtrl.push(CarProfilePage);
      return;
    }
    console.log("No Car is selected");
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

  getUserImageUrl() {
    return `${env.BASE_URL}/${this.user.profileImage}`;
  }
}
