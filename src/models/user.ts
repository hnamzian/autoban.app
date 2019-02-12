import { API } from "./api";

export interface UserAPI extends API {
  token: string;
  user: User;
}

export interface User {
  email: string;
  enabled: string;
  firstName: string;
  id: string;
  lastName: string;
  mobileNumber: string;
  password: string;
  image: string;
  profileImage: string;
  type: string;
}
