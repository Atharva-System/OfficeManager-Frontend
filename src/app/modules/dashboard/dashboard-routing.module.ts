import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component : DashboardComponent,
    children : [
      {
        path: 'employee-list',
        component: EmployeeListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
