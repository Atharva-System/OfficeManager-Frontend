export interface IDepartment {
  id?: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface IResponseDepartment {
  data: {
    items: IDepartment[];
    totalCount: number;
    pageNumber: number;
  };
  message: string;
  statusCode: string;
  errors: any[];
  isSuccess: boolean;
}
