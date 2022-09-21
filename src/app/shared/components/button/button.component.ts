import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() type: string = 'button';
  @Input() name!: string;
  @Input() isDisabled!: boolean;

  constructor() {}

  ngOnInit(): void {}

  getStyles() {
    return `w-${this.text}`;
  }
}
