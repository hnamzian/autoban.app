import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { map, catchError } from "rxjs/operators";

import { CarProvider } from "../../../../providers/car/car";

import {
  Car,
  CarBrands,
  BrandItem,
  CarColors,
  ColorItem,
  CarModels,
  ModelItem
} from "../../../../models/car";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "register-car-profile",
  templateUrl: "register-car-profile.html"
})
export class RegisterCarProfilePage implements OnInit {
  carProfile = {} as Car;

  brands$: Observable<BrandItem[]>;
  trims$: Observable<ColorItem[]>;
  models$: Observable<ModelItem[]>;

  constructor(public navCtrl: NavController, public carProvider: CarProvider) {
    this.carProfile.colorId = "1";
  }

  async ngOnInit() {
    await this.loadCarBrands();
    await this.loadCarColors();

    // this.carProvider.getCarModels().subscribe(console.log);
  }

  async loadCarBrands() {
    let subscription: false | Observable<CarBrands>;
    subscription = await this.carProvider.getCarBrands();
    if (subscription) {
      this.brands$ = subscription.pipe(
        map((result: CarBrands) => result.carBrands)
      );
    }
  }

  async loadCarColors() {
    let subscription: false | Observable<CarColors>;
    subscription = await this.carProvider.getCarColors();
    if (subscription) {
      this.trims$ = subscription.pipe(
        map((result: CarColors) => result.colors)
      );
    }
  }

  async loadCarModels(brandId) {
    let subscription: false | Observable<CarModels>;
    subscription = await this.carProvider.getCarModels(brandId);
    if (subscription) {
      this.models$ = subscription.pipe(
        map((result: CarModels) => result.carModels)
      );
    }
  }

  async registerCar() {
    console.log(this.carProfile);
    let subscription = await this.carProvider.registerCar(this.carProfile);
    if (subscription) {
      subscription.pipe().subscribe(console.log);
    }
  }
}
