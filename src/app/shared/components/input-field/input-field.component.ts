import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() error = false;
  @Input() icon : string = 'assets/svg/info.svg';
  
  constructor() {}

  ngOnInit(): void {}
}
