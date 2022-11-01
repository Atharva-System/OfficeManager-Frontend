import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Filter2Component } from './components/filter2/filter2.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonComponent } from './components/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TableComponent } from './components/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DropDownComponent } from './components/drop-down/drop-down.component';

@NgModule({
  declarations: [
    MenuComponent,
    FilterComponent,
    DropDownComponent,
    FilterPipe,
    Filter2Component,
    ButtonComponent,
    InputFieldComponent,
    TableComponent,
    DashboardHeaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
  ],
  exports: [
    MenuComponent,
    FilterComponent,
    Filter2Component,
    DropDownComponent,
    ButtonComponent,
    InputFieldComponent,
    TableComponent,
    DashboardHeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
