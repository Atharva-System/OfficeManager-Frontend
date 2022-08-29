import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFilter } from './core/shared/interfaces/filter';
import { IMenuItem } from './core/shared/interfaces/menu-item';
import { CommonService } from './core/shared/services/common/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OfficeManager';
  isSearch = true;

  menuItems;
  filterAttributes;

  constructor(
    public translate: TranslateService,
    public commonService: CommonService
  ) {
    //Set langulage english
    translate.setDefaultLang('en');
    translate.use('en');

    this.menuItems = this.commonService.menuItems;
    this.filterAttributes = this.commonService.filterAttributes;
  }

  //To get item on click DropDown MenuItem
  onItemClick(item: any) {
    console.log(item);
  }

  //To get attribute of filter
  filtredAttributes(item: IFilter[]) {
    this.filterAttributes = item;
    console.log(this.filterAttributes);
  }
}
