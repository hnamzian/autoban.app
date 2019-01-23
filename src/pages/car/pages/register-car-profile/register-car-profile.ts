import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import { CarProvider } from "../../../../providers/car/car";
import { Car, CarBrand, CarColor, CarModel } from "../../../../models/car";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { RegisterPage } from "../../../auth/pages/register/register";

@Component({
  selector: "register-car-profile",
  templateUrl: "register-car-profile.html"
})
export class RegisterCarProfilePage implements OnInit {
  carProfile = {} as Car;

  brands$: Observable<CarBrand[]>;
  trims$: Observable<CarColor[]>;
  models$: Observable<CarModel[]>;

  constructor(public navCtrl: NavController, public carProvider: CarProvider) {}

  async ngOnInit() {
    await this.loadCarBrands();
    await this.loadCarColors();
  }

  async loadCarBrands() {
    this.brands$ = (await this.carProvider.getCarBrands()).pipe(map(result => result.carBrands));
  }

  async loadCarColors() {
    this.trims$ = (await this.carProvider.getCarColors()).pipe(map(result => result.colors));
  }

  async loadCarModels(brandId) {
    this.models$ = (await this.carProvider.getCarModels(brandId)).pipe(
      map(result => result.carModels)
    );
  }

  async registerCar() {
    let carapi$ = await this.carProvider.registerCar(this.carProfile);
    carapi$.subscribe(carapi => {
      if (!carapi) {
        this.navCtrl.push(RegisterPage)
      } else if (!carapi.success) {
          // ToDo: toast error and stay this page
      } else {
        this.navCtrl.push(VehicleMenuPage);
      }
    });
  }
}
