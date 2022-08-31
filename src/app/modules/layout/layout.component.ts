import { Component, OnInit } from '@angular/core';
import { LayOutCommonService } from 'src/app/core/layout/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public constant;
  innerWidth;

  menuItems: any = [
    {
      name: 'aa',
      icon: 'assets/svg/home.svg',
      isIcon: true,
    },
    {
      name: 'gfg',
      icon: 'assets/svg/message.svg',
      isIcon: true,
    },
    {
      name: 'fffdettttttttttt',
      icon: 'assets/svg/inbox.svg',
      isIcon: true,
    },
    {
      name: 'bb',
      icon: 'assets/svg/notifications.svg',
      isIcon: true,
    },
  ];

  constructor(public layoutCommonService : LayOutCommonService) {
    this.constant = ConstantClass;
    this.innerWidth = window.innerWidth;
   }

  ngOnInit(): void {
  }

}
