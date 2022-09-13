import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFilter } from './core/shared/models/filter';
import { CommonService } from './core/shared/services/common/common.service';
import { LayOutCommonService } from './core/layout/services/common/common.service';
import { ConstantClass } from './shared/constants/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    //Set langulage english
    translate.setDefaultLang('en');
    translate.use('en');

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      } else if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });
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
