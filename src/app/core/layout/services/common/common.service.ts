import { Injectable } from '@angular/core';
import { IMenuItem } from 'src/app/core/shared/models/menu-item';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';

@Injectable({
  providedIn: 'root'
})
export class LayOutCommonService {
  //Flag for open and close sidebar
  isOpenSidebar = true;
   //Flag for change theme icon and toggle theme
  isDarkTheme = true;

  menuItems: IMenuItem[] = [
    {
      name: 'My Profile',
      icon: SVGs.user,
      isIcon: true,
    },
    {
      name: 'Settings',
      icon: SVGs.settings,
      isIcon: true,
    },
    {
      name: 'Messages',
      icon: SVGs.message,
      isIcon: true,
    },
    {
      name: 'Log Out',
      icon: SVGs.signOut,
      isIcon: true,
    },
  ];
  
  constructor() { 
    //To close sidebar on mobile screeen 
    if(window.innerWidth < ConstantClass.innerWidth.tablet){
      this.isOpenSidebar = false;
    }
  }
}
