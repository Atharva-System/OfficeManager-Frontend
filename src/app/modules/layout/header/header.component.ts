import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/layout/services/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems;

  constructor(public commonService : CommonService) {
    this.menuItems = this.commonService.menuItems;
  }

  ngOnInit(): void {}

   //To get item on click DropDown MenuItem
   onItemClick(item: any) {
    console.log(item);
  }
}
