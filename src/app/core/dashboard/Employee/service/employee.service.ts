import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { Store } from 'src/app/core/shared/models/store';
import { ApiService } from 'src/app/core/shared/services/api/api.service';
import { APIs } from 'src/app/shared/constants/apis';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';

export class EmployeeState {
  items!: never[];
  totalCount!: number;
  pageNumber!: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends Store<EmployeeState> {
  actions = [
    // {
    //   title: ConstantClass.actions.edit,
    //   icon: SVGs.delete,
    //   isIcon: false,
    // },
    {
      title: ConstantClass.actions.delete,
      icon: SVGs.delete,
      isIcon: true,
    },
  ];

  // columns = [
  //   {
  //     title: 'Id',
  //     dataProperty: 'id',
  //     sortable: true,
  //     sorting: 'none',
  //     show: true,
  //   },
  //   {
  //     title: 'Name',
  //     dataProperty: 'name',
  //     sortable: true,
  //     sorting: 'none',
  //     show: true,
  //   },
  //   {
  //     title: 'Full Name',
  //     dataProperty: 'full_name',
  //     sortable: true,
  //     sorting: 'none',
  //     show: true,
  //   },
  //   {
  //     title: 'Owner_Login',
  //     dataProperty: 'login',
  //     icon: 'avatar_url',
  //     sortable: true,
  //     sorting: 'none',
  //     show: true,
  //   },
  // ];

  columns = [
    {
      title: 'Id',
      dataProperty: 'employeeId',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Name',
      dataProperty: 'employeeName',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Designation',
      dataProperty: 'designation',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Department',
      dataProperty: 'department',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'DOB',
      dataProperty: 'dateOfBirth',
      sortable: true,
      sorting: 'none',
      date: true,
      show: true,
    },
    {
      title: 'Joining Date',
      dataProperty: 'dateOfJoining',
      sortable: true,
      sorting: 'none',
      date: true,
      show: true,
    },
  ];

  constructor(private apiCall: ApiService) {
    super(new EmployeeState());
    this.getAllEmployee(
      `?Page_No=1&Page_Size=${ConstantClass.employeeTable.itemsPerPage}`
    );
  }

  ngOnInit() {}

  getAllEmployee(url: string) {
    return this.apiCall
      .get(`${APIs.employeeApi}${url}`)
      .subscribe((data: any) => {
        this.state = data.data;
      });
  }
}
