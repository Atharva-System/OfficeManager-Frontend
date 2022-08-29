import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isOpen = false;
  
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

  constructor() { }

  ngOnInit(): void {
  }

}
