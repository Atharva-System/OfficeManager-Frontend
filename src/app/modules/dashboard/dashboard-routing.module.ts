import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { DashboardComponent } from './dashboard.component';
import { AddDepartmentComponent } from './department-list/add-department/add-department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddEmployeeComponent } from './employee-list/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: RouterPathClass.employeeList,
        component: EmployeeListComponent,
        data: {
          breadcrumb: RouterPathClass.breadcrumb.employee,
        },
        children: [
          {
            path: RouterPathClass.addEmployee,
            component: AddEmployeeComponent,
            data: {
              breadcrumb: RouterPathClass.breadcrumb.addEmployee,
            },
          },
        ],
      },
      {
        path: RouterPathClass.departmentList,
        component: DepartmentListComponent,
        data: {
          breadcrumb: RouterPathClass.breadcrumb.department,
        },
        children: [
          {
            path: RouterPathClass.addDepartment,
            component: AddDepartmentComponent,
            data: {
              breadcrumb: RouterPathClass.breadcrumb.addDepartment,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
