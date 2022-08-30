import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ LayoutComponent, HeaderComponent ],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
  // schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
