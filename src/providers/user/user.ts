import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx"
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../providers/token/token";
import { UserAPI } from "../../models/user";

@Injectable()
export class UserProvider {
  baseUrl = `${env.BASE_URL}/users`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async registerUser(account: Account, password: string): Promise<false | Observable<UserAPI>> {
    let url = `${this.baseUrl}/register`;

    const token = (await this.tokenStorage.getSMSToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .post(url, { ...account, password }, httpOptions)
      .pipe(map((result: UserAPI) => result));
  }

  async updateUser(user: Account): Promise<false | Observable<UserAPI>> {
    let url = `${this.baseUrl}/update`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.post(url, user, httpOptions).pipe(map((result: UserAPI) => result));
  }

  async changeMobileNumber(mobileNumber): Promise<false | Observable<UserAPI>> {
    let url = `${this.baseUrl}/change-mobile`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return false;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, { mobileNumber }, httpOptions).pipe(map((result: UserAPI) => result));
  }

  async getUser() {
    let url = `${this.baseUrl}/profile`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return Observable.of({} as UserAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.get(url, httpOptions).pipe(map((result: UserAPI) => result));
  }
}
