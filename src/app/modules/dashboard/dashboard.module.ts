import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './employee-list/add-employee/add-employee.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddDepartmentComponent } from './department-list/add-department/add-department.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ DashboardComponent, EmployeeListComponent, AddEmployeeComponent, DepartmentListComponent, AddDepartmentComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    GuiGridModule,
    NgxPaginationModule,
    SharedModule,
    AngularSvgIconModule,
    TranslateModule.forChild(),
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
