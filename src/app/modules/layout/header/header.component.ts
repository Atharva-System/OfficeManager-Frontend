import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { LayOutCommonService } from 'src/app/core/layout/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems;
  constructor(
    public layoutCommonService: LayOutCommonService,
    private _eref: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.menuItems = this.layoutCommonService.menuItems;
  }

  ngOnInit(): void {}

  //To get item on click DropDown MenuItem
  onItemClick(item: any) {
    console.log(item);
  }

  onThemeChange() {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        this.document.body.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        this.layoutCommonService.isDarkTheme = true;
      } else {
        this.document.body.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        this.layoutCommonService.isDarkTheme = false;
      }

      // if NOT set via local storage previously
    } else {
      if (this.document.body.classList.contains('dark')) {
        this.document.body.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        this.layoutCommonService.isDarkTheme = false;
      } else {
        this.document.body.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        this.layoutCommonService.isDarkTheme = true;
      }
    }
  }
}
