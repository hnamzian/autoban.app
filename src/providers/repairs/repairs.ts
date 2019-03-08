import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import { Repair, RepairsAPI } from "../../models/repair";

@Injectable()
export class RepairsProvider {
  baseUrl = `${env.BASE_URL}/repairs`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async getRepairs(carId) {
    let url = `${this.baseUrl}/list`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as RepairsAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("carId", carId)
    };

    return this.http.get(url, httpOptions).pipe(map((result: RepairsAPI) => result));
  }

  async addRepair(repair: Repair) {
    let url = `${this.baseUrl}/add-repair`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as RepairsAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, repair, httpOptions).pipe(map((result: RepairsAPI) => result));
  }

  async updateRepair(repair: Repair) {
    let url = `${this.baseUrl}/repair`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as RepairsAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, repair, httpOptions).pipe(map((result: RepairsAPI) => result));
  }

  async removeRepair(repairId) {
    let url = `${this.baseUrl}/repair`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as RepairsAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("repairId", repairId)
    };

    return this.http.delete(url, httpOptions).pipe(map((result: RepairsAPI) => result));
  }
}
