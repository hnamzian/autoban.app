import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";
import { TokenStorage } from "../../storage/token/token";
import { UserAPI, User } from "../../models/user";
import {API} from "../../models/api"

@Injectable()
export class UserProvider {
  baseUrl = `${env.BASE_URL}/users`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async registerUser(user: User, password: string): Promise<Observable<UserAPI>> {
    let url = `${this.baseUrl}/register`;

    const token = (await this.tokenStorage.getSMSToken()) || false;
    if (!token) return Observable.of({} as UserAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    let dummy = { ...user, password }
    console.log(dummy);
    

    return this.http
      .post(url, { ...user, password }, httpOptions)
      .pipe(map((result: UserAPI) => result));
  }

  async updateUser(user: User): Promise<Observable<API>> {
    let url = `${this.baseUrl}/user`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return Observable.of({} as API);

    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("profileImage", user.profileImage)

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, formData, httpOptions).pipe(map((result: API) => result));
  }

  async changeMobileNumber(mobileNumber): Promise<Observable<UserAPI>> {
    let url = `${this.baseUrl}/change-mobile`;

    const token = (await this.tokenStorage.getAuthToken()) || false;
    if (!token) return Observable.of({} as UserAPI);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.put(url, { mobileNumber }, httpOptions).pipe(map((result: UserAPI) => result));
  }

  async getUser(): Promise<Observable<UserAPI>> {
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
