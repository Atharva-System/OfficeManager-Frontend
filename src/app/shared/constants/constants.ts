import { FormGroup, Validators } from "@angular/forms";

export class ConstantClass {
  static escapeKey = 'escape';
  static darkClass = 'dark';
  static lightClass = 'light';
  static innerWidth = 800;
  static document = {
    click: 'document:click',
    keydown: 'document:keydown',
  };
  static placement: any = 'bottom-start';

  //validators
  static validators = Validators;

  //forms
  static signinForm : FormGroup;

}
