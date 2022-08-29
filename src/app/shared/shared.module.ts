import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Filter2Component } from './components/filter2/filter2.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [MenuComponent, FilterComponent, FilterPipe, Filter2Component],
  imports: [CommonModule, TranslateModule.forChild(), FormsModule],
  exports: [MenuComponent, FilterComponent, Filter2Component],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
