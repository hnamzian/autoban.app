import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import { ServiceAPI, ServiceItemsAPI, Service, ServicesListAPI } from "../../models/service";

@Injectable()
export class ServicesProvider {
  baseUrl = `${env.BASE_URL}/periodic-services`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async getServiceItems() {
    let url = `${this.baseUrl}/service-items`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as ServiceItemsAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.get(url, httpOptions).pipe(map((result: ServiceItemsAPI) => result));
  }

  async addService(service: Service) {
    let url = `${this.baseUrl}/add`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as ServiceAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, service, httpOptions).pipe(map((result: ServiceAPI) => result));
  }

  async getServices(carId) {
    let url = `${this.baseUrl}/list`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as ServicesListAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("carId", carId)
    };

    return this.http.get(url, httpOptions).pipe(map((result: ServicesListAPI) => result));
  }
}
