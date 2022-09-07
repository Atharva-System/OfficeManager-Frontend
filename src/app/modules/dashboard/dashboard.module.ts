import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ DashboardComponent, EmployeeListComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    GuiGridModule,
    NgxPaginationModule,
    SharedModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
