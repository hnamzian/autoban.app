import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { AuthJWTAPI } from "../../models/auth-token";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import { UserAPI, User } from "../../models/user";
import { SMSJWTAPI } from "../../models/sms-token";
import { error } from "util";

@Injectable()
export class AuthProvider {
  baseUrl = `${env.BASE_URL}/users`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  getSMSToken(mobileNumber): Observable<SMSJWTAPI> {
    let url = `${this.baseUrl}/get-sms-token`;
    return this.http
      .post(url, { mobileNumber })
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(map((result: SMSJWTAPI) => result));
  }

  verifySMSToken(mobileNumber, token): Observable<AuthJWTAPI> {
    let url = `${this.baseUrl}/check-sms-token`;

    return this.http
      .post(url, { mobileNumber, token })
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(
        map((result: AuthJWTAPI) => {
          return {
            success: result.success,
            token: result.token || "",
            message: result.message || ""
          };
        })
      );
  }

  authenticateByPassword(username, password): Observable<UserAPI> {
    let url = `${this.baseUrl}/authenticate-password`;

    console.log({ username, password });
    return this.http
      .post(url, { username, password })
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(map((result: UserAPI) => result));
  }

  async authenticateByToken() {
    let url = `${this.baseUrl}/authenticate-token`;

    const token = (await this.tokenStorage.getSMSToken()) || false;
    console.log(token);

    if (!token) return Observable.of({} as UserAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http
      .get(url, httpOptions)
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(map((result: UserAPI) => result));
  }
}
