import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { createPopper } from '@popperjs/core';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { IFilter } from 'src/app/core/shared/models/filter';
@Component({
  selector: 'app-filter2',
  templateUrl: './filter2.component.html',
  styleUrls: ['./filter2.component.scss'],
})
export class Filter2Component implements AfterViewInit {
  @Input()
  filterAttributes!: IFilter[];
  @Input()
  isSearch!: boolean;
  @Output() filtredAttributes = new EventEmitter<any>();

  attributes: any[] = [];
  dropdownPopoverShow = false;
  searchAttribute!: string;

  @ViewChild('btnDropdownRef', { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

  constructor(private _eref: ElementRef) {}

  ngAfterViewInit() {
    ConstantClass.placement =
      window.innerHeight < 368 ? 'top-start' : 'bottom-start';

    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: ConstantClass.placement,
      }
    );
  }

  //To toggle DropDown
  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  //To hide DropDown on click on outside this component
  @HostListener(ConstantClass.document.click, ['$event'])
  public hideDropdown(event: any) {
    if (
      !this._eref.nativeElement.contains(event.target) &&
      event?.target &&
      !event?.target?.src?.includes('close.svg')
    )
      this.dropdownPopoverShow = false;
  }

  //To hide DropDown on press on Esc
  @HostListener(ConstantClass.document.keydown, ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key.toLowerCase() === ConstantClass.escapeKey) {
      this.dropdownPopoverShow = false;
    }
  }

  onClick(attribute: string) {
    if (!this.attributes.includes(attribute)) this.attributes.push(attribute);
  console.log(this.attributes.includes(attribute));
  
  }

  //On apply Filter
  onApply() {
    this.dropdownPopoverShow = false;
    this.filterAttributes.map((data) => {
      data.isChecked = this.attributes.includes(data.name) ? true : false;
    });

    this.filtredAttributes.emit(this.filterAttributes);
  }

  //On clear filter
  onClear() {
    this.dropdownPopoverShow = false;
    this.filterAttributes.map((data) => (data.isChecked = false));
    this.attributes = [];
    this.filtredAttributes.emit(this.filterAttributes);
  }

  onCloseAttribute(index: number) {
    this.attributes.splice(index, 1);
  }
}
