import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

import { environment as env } from "../../config/environment.prod";

import { TokenStorage } from "../../providers/token/token";

import {
  FuelCost,
  FineCost,
  OthersCost,
  PeriodicCost
} from "../../models/costs";

@Injectable()
export class CostsProvider {
  baseUrl = `${env.BASE_URL}/costs`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async addFuelCost(fuelCost: FuelCost) {
    let url = `${env.BASE_URL}/add-fuel`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, fuelCost, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async deleteFuelCost(fuelId) {
    let url = `${env.BASE_URL}/delete-fuel`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { fuelId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async addFineCost(fineCost: FineCost) {
    let url = `${env.BASE_URL}/add-fine`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, fineCost, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async deleteFineCost(fineId) {
    let url = `${env.BASE_URL}/delete-fine`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { fineId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async addPeriodicCost(periodicCost: PeriodicCost) {
    let url = `${env.BASE_URL}/add-periodic`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, periodicCost, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async deletePeriodicCost(periodicCostId) {
    let url = `${env.BASE_URL}/delete-periodic`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { periodicCostId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async addOthersCost(othersCost: OthersCost) {
    let url = `${env.BASE_URL}/add-other`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, othersCost, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async deleteOthersCost(costId) {
    let url = `${env.BASE_URL}/delete-other`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { costId }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async listCosts(carId, from, to) {
    let url = `${env.BASE_URL}/list`;

    let token = await this.tokenStorage.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, { carId, from, to }, httpOptions);
    //   .pipe(map((result: User) => result));
  }

  async listCategorizedCost(carId) {
    let url = `${env.BASE_URL}/list-categorized`;

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
