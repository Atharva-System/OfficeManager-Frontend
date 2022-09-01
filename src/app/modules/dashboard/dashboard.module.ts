import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  declarations: [ DashboardComponent, EmployeeListComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
