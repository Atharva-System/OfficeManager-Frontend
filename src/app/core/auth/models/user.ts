export interface IUser {
  employeeNo: number;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
    refreshTokenExpiration: string;
  };
  statusCode: string;
  errors: any[];
  isSuccess: boolean;
}
