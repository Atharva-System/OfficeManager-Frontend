import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'src/app/core/shared/models/store';
import { ApiService } from 'src/app/core/shared/services/api/api.service';
import { APIs } from 'src/app/shared/constants/apis';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';
import { IDepartment, IResponseDepartment } from '../model/department';

export class DepartmentState {
  items!: IDepartment[];
  totalCount!: number;
  pageNumber!: number;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends Store<DepartmentState> {
  actions = [
    {
      title: ConstantClass.actions.edit,
      icon: SVGs.delete,
      isIcon: false,
    },
    {
      title: ConstantClass.actions.delete,
      icon: SVGs.delete,
      isIcon: true,
    },
  ];

  columns = [
    {
      title: 'Id',
      dataProperty: 'id',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Name',
      dataProperty: 'name',
      isEdit : true,
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Description',
      dataProperty: 'description',
      sortable: true,
      sorting: 'none',
      show: true,
    },
  ];

  constructor(private apiCall: ApiService) {
    super(new DepartmentState());

    this.getAllDepartment(
      `?Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
    );
  }

  ngOnInit() {}

  getAllDepartment(url: string) {
    return this.apiCall
      .get(`${APIs.departmentApi}${url}`)
      .subscribe((data: any) => {
        this.state = data.data;
      });
  }

  createDepartment(url: string, body: IDepartment) {
    return this.apiCall.post(`${APIs.departmentAdd}${url}`, body).subscribe({
      next: (response: any) => {
        this.getAllDepartment(
          `?Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
        );
      },
      error: (e) => console.log(e),
    });
  }

  updateDepartment(url: string, body: IDepartment) {
    return this.apiCall
      .put(`${APIs.departmentUpdate}${url}`, body)
      .subscribe((data: IResponseDepartment) => {
        this.getAllDepartment(
          `?Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
        );
      });
  }

  deleteDepartment(url: string) {
    return this.apiCall
      .delete(`${APIs.departmentDelete}${url}`)
      .subscribe((data: IResponseDepartment) => {
        this.getAllDepartment(
          `?Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
        );
      });
  }
}
