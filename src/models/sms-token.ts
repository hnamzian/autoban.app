import { API } from "./api";

export interface SMSJWTAPI extends API {
  token: SMSToken
}

export interface SMSToken {
  token: string;
  mobileNumber: string;
}
