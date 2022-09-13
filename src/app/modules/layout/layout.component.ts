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
      name: 'aa',
      icon: SVGs.home,
      isIcon: true,
    },
    {
      name: 'gfg',
      icon: SVGs.message,
      isIcon: true,
    },
    {
      name: 'fffdettttttttttt',
      icon: SVGs.inbox,
      isIcon: true,
    },
    {
      name: 'bb',
      icon: SVGs.notifications,
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
