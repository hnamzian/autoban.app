import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment as env } from "../../config/environment.prod";

import { TokenStorage } from "../../storage/token/token"


@Injectable()
export class RepairsProvider {
  baseUrl = `${env.BASE_URL}/repairs`;

  token: string;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}
  
}
