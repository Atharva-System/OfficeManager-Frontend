export interface IUser {
    employeeNo : number,
    password : string
}


export interface LoginResponse {
    message:    string;
    data:       string;
    statusCode: string;
    errors:     any[];
    isSuccess:  boolean;
}
