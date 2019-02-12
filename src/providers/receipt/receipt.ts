import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import { Receipt, ReceiptAPI } from "../../models/receipt";

@Injectable()
export class RepairsProvider {
  baseUrl = `${env.BASE_URL}/repairs`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async addReceipt(receipt: Receipt) {
    let url = `${this.baseUrl}/add-receipt`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as ReceiptAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, receipt, httpOptions).pipe(map((result: ReceiptAPI) => result));
  }

  async addReceiptItems() {
    let url = `${this.baseUrl}/receipt-items`;

    let token = await this.tokenStorage.getAuthToken();
    // if (!token) return Observable.of({} as RepairAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    // return this.http.get(url, httpOptions).pipe(map((result: RepairAPI) => result));
  }

  async removeReceipt(receiptId) {
    let url = `${this.baseUrl}/list`;

    let token = await this.tokenStorage.getAuthToken();
    if (!token) return Observable.of({} as ReceiptAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      params: new HttpParams().set("receiptId", receiptId)
    };

    return this.http.delete(url, httpOptions).pipe(map((result: ReceiptAPI) => result));
  }

}
