import { Component, OnInit } from '@angular/core';
import { LayOutCommonService } from 'src/app/core/layout/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public constant;
  public svgs;
  innerWidth;

  menuItems: any = [
    {
      name: 'Employee',
      icon: SVGs.home,
      routerLink: 'employee-list',
      isIcon: true,
    },
    {
      name: 'gfg',
      icon: SVGs.message,
      routerLink: '',
      isIcon: true,
    },
    {
      name: 'fffdettttttttttt',
      icon: SVGs.inbox,
      routerLink: '',
      isIcon: true,
    },
    {
      name: 'bb',
      icon: SVGs.notifications,
      routerLink: '',
      isIcon: true,
    },
  ];

  constructor(public layoutCommonService: LayOutCommonService) {
    this.constant = ConstantClass;
    this.svgs = SVGs;
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {}
}
