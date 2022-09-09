import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { DashboardComponent } from './dashboard.component';
import { AddEmployeeComponent } from './employee-list/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component : DashboardComponent,
    children : [
      {
        path: RouterPathClass.employeeList,
        component: EmployeeListComponent,
        children : [
          {
            path :  RouterPathClass.addEmployee,
            component : AddEmployeeComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
