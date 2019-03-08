import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import { FuelAPI, AllFuelsAPI, AllFinesAPI, FineAPI, OthersCostAPI, AllOthersCostAPI, PeriodicCostAPI, AllPeriodicCostAPI, Cost, Fuel } from "../../models/costs";
import { API } from "../../models/api";

@Injectable()
export class CostsProvider {
  baseUrl = `${env.BASE_URL}/costs`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  // ToDo: HJ better to get fuelCost of type Fuel
  async addFuelCost(fuelCost) {
    let url = `${this.baseUrl}/fuel`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FuelAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, fuelCost, httpOptions).pipe(map((result: FuelAPI) => result));
  }

  async updateFuelCost(fuelCost) {
    let url = `${this.baseUrl}/fuel`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FuelAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    console.log(fuelCost);
    return this.http.put(url, fuelCost, httpOptions).pipe(map((result: FuelAPI) => result));
  }

  async deleteFuelCost(fuelId) {
    let url = `${this.baseUrl}/fuel`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FuelAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("fuelId", fuelId)
    };

    console.log("del");

    return this.http.delete(url, httpOptions).pipe(map((result: API) => result));
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

  async addFineCost(fineCost) {
    let url = `${this.baseUrl}/fine`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FineAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, fineCost, httpOptions).pipe(map((result: FineAPI) => result));
  }

  async updateFineCost(fineCost) {
    let url = `${this.baseUrl}/fine`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FineAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, fineCost, httpOptions).pipe(map((result: FineAPI) => result));
  }

  async deleteFineCost(fineId) {
    let url = `${this.baseUrl}/fine`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as FineAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("fineId", fineId)
    };

    return this.http.delete(url, httpOptions).pipe(map((result: API) => result));
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

  async addPeriodicCost(periodicCost) {
    let url = `${this.baseUrl}/periodic`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, periodicCost, httpOptions).pipe(map((result: PeriodicCostAPI) => result));
  }

  async updatePeriodicCost(periodicCost) {
    let url = `${this.baseUrl}/periodic`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, periodicCost, httpOptions).pipe(map((result: PeriodicCostAPI) => result));
  }

  async deletePeriodicCost(periodicCostId) {
    let url = `${this.baseUrl}/periodic`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("periodicCostId", periodicCostId)
    };

    return this.http.delete(url, httpOptions).pipe(map((result: API) => result));
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

    return this.http.post(url, { carId }, httpOptions).pipe(map((result: AllPeriodicCostAPI) => result));
  }

  async addOthersCost(othersCost) {
    let url = `${this.baseUrl}/other`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as OthersCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, othersCost, httpOptions).pipe(map((result: OthersCostAPI) => result));
  }

  async updateOthersCost(othersCost) {
    let url = `${this.baseUrl}/other`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as OthersCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, othersCost, httpOptions).pipe(map((result: OthersCostAPI) => result));
  }

  async deleteOthersCost(costId) {
    let url = `${this.baseUrl}/other`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as PeriodicCostAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("costId", costId)
    };

    return this.http.delete(url, httpOptions).pipe(map((result: API) => result));
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

    return this.http.post(url, { carId }, httpOptions).pipe(map((result: AllOthersCostAPI) => result));
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
