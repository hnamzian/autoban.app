import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx"
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";

import { TokenStorage } from "../../providers/token/token";

import { CarAPI, Car, CarBrands, CarColors, CarModels } from "../../models/car";

@Injectable()
export class CarProvider {
  baseUrl = `${env.BASE_URL}/cars`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async registerCar(car: Car) {
    const url = `${this.baseUrl}/register`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    let formData = new FormData();
    formData.append("modelId", car.modelId);
    formData.append("colorId", car.colorId);
    formData.append("image", car.image);
    formData.append("name", car.name);
    formData.append("plate", car.plate);
    formData.append("odometer", car.odometer);
    formData.append("bulityear", car.bulityear);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, formData, httpOptions);
  }

  async updateCar(car: Car) {
    const url = `${this.baseUrl}/update-odometer`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, car, httpOptions);
  }

  async deleteCar(carId) {
    const url = `${this.baseUrl}/update-odometer`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { carId }, httpOptions);
  }

  async updateOdometer(odometer) {
    const url = `${this.baseUrl}/update-odometer`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { odometer }, httpOptions);
  }

  async getCrs() {
    const url = `${this.baseUrl}/list`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return Observable.of({} as CarAPI);;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.get(url, httpOptions).pipe(
        map((result: CarAPI) => result)
    );
  }

  async getCarBrands() {
    const url = `${this.baseUrl}/list-car-brands`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .get(url, httpOptions)
      .pipe(map((result: CarBrands) => result));
  }

  async getCarModels(brandId) {
    const url = `${this.baseUrl}/list-car-models`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { brandId }, httpOptions)
      .pipe(map((result: CarModels) => result));
  }

  async getCarColors() {
    const url = `${this.baseUrl}/list-colors`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .get(url, httpOptions)
      .pipe(map((result: CarColors) => result));
  }
}
