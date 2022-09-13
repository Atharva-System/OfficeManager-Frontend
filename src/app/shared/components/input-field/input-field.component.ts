import { Component, Input, OnInit, Output } from '@angular/core';
import { SVGs } from '../../constants/svgs';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() error = false;
  @Input() icon : string = SVGs.info;
  public svgs;
  
  constructor() {
    this.svgs = SVGs;
  }

  ngOnInit(): void {}
}
