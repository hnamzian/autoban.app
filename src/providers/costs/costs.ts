import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import {
  FuelAPI,
  AllFuelsAPI,
  AllFinesAPI,
  FineAPI,
  OthersCostAPI,
  AllOthersCostAPI,
  PeriodicCostAPI,
  AllPeriodicCostAPI,
  Cost
} from "../../models/costs";

@Injectable()
export class CostsProvider {
  baseUrl = `${env.BASE_URL}/costs`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async addFuelCost(fuelCost: Cost, stationName, odometer) {
    let url = `${this.baseUrl}/fuel`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FuelAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { ...fuelCost, stationName, odometer }, httpOptions)
      .pipe(map((result: FuelAPI) => result));
  }

  async deleteFuelCost(fuelId) {
    let url = `${this.baseUrl}/delete-fuel`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FuelAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { fuelId }, httpOptions);
    //.pipe(map((result: User) => result));
  }

  async getFuels(carId) {
    let url = `${this.baseUrl}/list-fuels`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as AllFuelsAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { carId }, httpOptions).pipe(map((result: AllFuelsAPI) => result));
  }

  async addFineCost(fineCost: Cost, fineCategoryCode) {
    let url = `${this.baseUrl}/fine`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FineAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { ...fineCost, fineCategoryCode }, httpOptions)
      .pipe(map((result: FineAPI) => result));
  }

  async deleteFineCost(fineId) {
    let url = `${this.baseUrl}/delete-fine`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FineAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { fineId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async getFines(carId) {
    let url = `${this.baseUrl}/list-fines`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as AllFinesAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { carId }, httpOptions).pipe(map((result: AllFinesAPI) => result));
  }

  async addPeriodicCost(periodicCost: Cost, period) {
    let url = `${this.baseUrl}/periodic`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { ...periodicCost, period }, httpOptions)
      .pipe(map((result: PeriodicCostAPI) => result));
  }

  async deletePeriodicCost(periodicCostId) {
    let url = `${this.baseUrl}/delete-periodic`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { periodicCostId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async getPeriodicCosts(carId) {
    let url = `${this.baseUrl}/list-periodics`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as AllPeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { carId }, httpOptions)
      .pipe(map((result: AllPeriodicCostAPI) => result));
  }

  async addOthersCost(othersCost: Cost) {
    let url = `${this.baseUrl}/other`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as OthersCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, othersCost, httpOptions)
      .pipe(map((result: OthersCostAPI) => result));
  }

  async deleteOthersCost(costId) {
    let url = `${this.baseUrl}/delete-other`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { costId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async getOthersCosts(carId) {
    let url = `${this.baseUrl}/list-others`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as AllOthersCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { carId }, httpOptions)
      .pipe(map((result: AllOthersCostAPI) => result));
  }

  async listCosts(carId, from, to) {
    let url = `${this.baseUrl}/list`;

    let token = await this.tokenStorage.getAuthToken();
    // if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { carId, from, to }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async listCategorizedCost(carId) {
    let url = `${this.baseUrl}/list-categorized`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { carId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }
}
