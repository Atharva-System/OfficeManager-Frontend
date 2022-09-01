import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFilter } from 'src/app/core/shared/models/filter';
import { IMenuItem } from 'src/app/core/shared/models/menu-item';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  translation!: string;
  menuItems: IMenuItem[] = [
    {
      name: 'aa',
      icon: 'assets/svg/heart.svg',
      isIcon: true,
    },
    {
      name: 'gfg',
      icon: 'assets/svg/heart.svg',
      isIcon: true,
    },
    {
      name: 'fffdettttttttttt',
      icon: 'assets/svg/heart.svg',
      isIcon: false,
    },
    {
      name: 'bb',
      icon: '',
      isIcon: true,
    },
  ];

  filterAttributes: IFilter[] = [
    {
      isChecked: false,
      name: 'abc',
    },
    {
      isChecked: false,
      name: 'fdfdfss',
    },
    {
      isChecked: false,
      name: 'sfddddddddd',
    },
    {
      isChecked: false,
      name: 'sfdfs',
    },
    {
      isChecked: false,
      name: 'dfre',
    },
    {
      isChecked: true,
      name: 'adfdfbc',
    },
    {
      isChecked: false,
      name: 'erwre',
    },
  ];

  constructor(public translateService: TranslateService) {}

  //To get translated data
  getTranslateData(text: string) {
    this.translateService
      .get(text)
      .pipe()
      .subscribe((value) => {
        this.translation = value;
      });
    return this.translation;
  }
}
