import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Car } from "../../models/car";

@Injectable()
export class CarStorage {
  constructor(public storage: Storage) {}

  async setCars(cars: Car[]) {
    await this.storage.set("Cars", cars);
  }

  async getCars() {
    let cars: Car[] = await this.storage.get("Cars");
    return cars
  }

  async setSelectedCar(car: Car) {
    await this.storage.set("SelectedCAR", car);
  }

  async getSelectedCar() {
    let car: Car = await this.storage.get("SelectedCAR");
    return car;
  }
}
