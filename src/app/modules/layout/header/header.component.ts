import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth/auth.service';
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
    public authService: AuthService,
    private router : Router,
    private _eref: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.menuItems = this.layoutCommonService.menuItems;
  }

  ngOnInit(): void {}

  //To get item on click DropDown MenuItem
  onItemClick(item: any) {
    console.log(item.item.name);

    if(item.item.name.toLowerCase() === 'log out'){
      localStorage.removeItem('loggedIn');
      this.router.navigate(['']);
      this.authService.isLoggedIn = '';
      console.log(this.authService.isLoggedIn);
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
        this.document.body.classList.remove( ConstantClass.darkClass);
        localStorage.setItem('color-theme', ConstantClass.lightClass);
        this.layoutCommonService.isDarkTheme = false;
      }

      // if NOT set via local storage previously
    } else {
      if (this.document.body.classList.contains( ConstantClass.darkClass)) {
        this.document.body.classList.remove( ConstantClass.darkClass);
        localStorage.setItem('color-theme', ConstantClass.lightClass);
        this.layoutCommonService.isDarkTheme = false;
      } else {
        this.document.body.classList.add( ConstantClass.darkClass);
        localStorage.setItem('color-theme',  ConstantClass.darkClass);
        this.layoutCommonService.isDarkTheme = true;
      }
    }
  }
}
