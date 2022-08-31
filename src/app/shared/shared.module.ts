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

@NgModule({
  declarations: [MenuComponent, FilterComponent, FilterPipe, Filter2Component, ButtonComponent, InputFieldComponent],
  imports: [CommonModule, TranslateModule.forChild(), FormsModule, ReactiveFormsModule],
  exports: [MenuComponent, FilterComponent, Filter2Component, ButtonComponent, InputFieldComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
