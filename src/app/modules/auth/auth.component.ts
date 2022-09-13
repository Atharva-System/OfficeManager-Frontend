import { Component, OnInit } from '@angular/core';
import { SVGs } from 'src/app/shared/constants/svgs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public svgs;

  constructor() {
    this.svgs = SVGs;
  }

  ngOnInit(): void {}
}
