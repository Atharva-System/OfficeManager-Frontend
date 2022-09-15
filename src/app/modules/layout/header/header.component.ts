import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth/auth.service';
import { LayOutCommonService } from 'src/app/core/layout/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems;
  public svgs;

  constructor(
    public layoutCommonService: LayOutCommonService,
    public authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.menuItems = this.layoutCommonService.menuItems;
    this.svgs = SVGs;
  }

  ngOnInit(): void {}

  //To get item on click DropDown MenuItem
  onItemClick(item: any) {
    console.log(item.item.name);

    if (item.item.name.toLowerCase() === 'log out') {
      this.authService.logout();
      this.router.navigate(['']);
    }
  }

  //On click on theme icon
  onThemeChange() {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === ConstantClass.lightClass) {
        this.document.body.classList.add(ConstantClass.darkClass);
        localStorage.setItem('color-theme', ConstantClass.darkClass);
        this.layoutCommonService.isDarkTheme = true;
      } else {
        this.document.body.classList.remove(ConstantClass.darkClass);
        localStorage.setItem('color-theme', ConstantClass.lightClass);
        this.layoutCommonService.isDarkTheme = false;
      }

      // if NOT set via local storage previously
    } else {
      if (this.document.body.classList.contains(ConstantClass.darkClass)) {
        this.document.body.classList.remove(ConstantClass.darkClass);
        localStorage.setItem('color-theme', ConstantClass.lightClass);
        this.layoutCommonService.isDarkTheme = false;
      } else {
        this.document.body.classList.add(ConstantClass.darkClass);
        localStorage.setItem('color-theme', ConstantClass.darkClass);
        this.layoutCommonService.isDarkTheme = true;
      }
    }
  }
}
