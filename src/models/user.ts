export interface UserAPI {
  success: string;
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
  profileImage: string;
  type: string;
}

