import { API } from "./api";

export interface AuthJWTAPI extends API {
  token: string;
}
