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
import { IMenuItem } from 'src/app/core/shared/models/menu-item';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from '../../constants/svgs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  @Input()
  menuItems!: IMenuItem[];
  @Input()
  isIcon!: string;
  @Input()
  title: any;
  @Output() onItemClick = new EventEmitter<any>();

  dropdownPopoverShow = false;
  public svgs;

  @ViewChild('btnDropdownRef', { static: true })
  btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: true })
  popoverDropdownRef!: ElementRef;

  constructor(private _eref: ElementRef) {
    this.svgs = SVGs;
  }

  ngAfterViewInit() {
    ConstantClass.placement =
      window.innerHeight < ConstantClass.innerWidth.sm
        ? ConstantClass.dropdownPosition.top
        : ConstantClass.dropdownPosition.bottom;

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
  public hideDropdown(event: Event) {
    if (!this._eref.nativeElement.contains(event.target))
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

  //On click on any DropDown item
  onClick(item: IMenuItem, index: number) {
    this.dropdownPopoverShow = false;
    const passVal = {
      item: item,
      index: index,
    };
    this.onItemClick.emit(passVal);
  }
}
