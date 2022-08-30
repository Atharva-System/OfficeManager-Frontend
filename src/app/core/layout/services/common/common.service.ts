import { Injectable } from '@angular/core';
import { IMenuItem } from 'src/app/core/shared/interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isOpenSidebar = true;
  isDarkTheme = false;

  menuItems: IMenuItem[] = [
    {
      name: 'My Profile',
      icon: 'assets/svg/user.svg',
      isIcon: true,
    },
    {
      name: 'Settings',
      icon: 'assets/svg/settings.svg',
      isIcon: true,
    },
    {
      name: 'Messages',
      icon: 'assets/svg/message.svg',
      isIcon: true,
    },
    {
      name: 'Log Out',
      icon: 'assets/svg/sign-out.svg',
      isIcon: true,
    },
  ];
  
  constructor() { }
}
