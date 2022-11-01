import { Component, OnInit } from '@angular/core';
import { LayOutCommonService } from 'src/app/core/layout/services/common/common.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
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
      routerLink: RouterPathClass.employeeList,
      isIcon: true,
    },
    {
      name: 'Department',
      icon: SVGs.message,
      routerLink: RouterPathClass.departmentList,
      isIcon: true,
    },
    {
      name: 'FullCalendar',
      icon: SVGs.inbox,
      routerLink: RouterPathClass.fullCalendar,
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
