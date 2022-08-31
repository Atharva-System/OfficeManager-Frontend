import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text! : string;
  @Input() name! : string;

  constructor() { }

  ngOnInit(): void {
  }

  getStyles(){
    return `w-${this.text}`;
  }
}
