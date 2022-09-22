import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './core/shared/services/common/common.service';
import { LayOutCommonService } from './core/layout/services/common/common.service';
import { ConstantClass } from './shared/constants/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OfficeManager';

  constructor(
    public translate: TranslateService,
    public commonService: CommonService,
    public layoutCommonService: LayOutCommonService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    //Set langulage english
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === ConstantClass.darkClass) {
        this.document.body.classList.add(ConstantClass.darkClass);
        this.layoutCommonService.isDarkTheme = true;
      } else this.layoutCommonService.isDarkTheme = false;
    }
  }
}
