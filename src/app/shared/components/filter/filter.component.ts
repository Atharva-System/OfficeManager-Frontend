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
import { TranslateService } from '@ngx-translate/core';
import { SVGs } from '../../constants/svgs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})

export class FilterComponent implements AfterViewInit {
  @Input()
  filterAttributes!: IFilter[];
  @Input()
  isSearch!: boolean;
  @Output() filtredAttributes = new EventEmitter<any>();

  attributes: any[] = [];
  dropdownPopoverShow = false;
  searchAttribute!: string;
  public svgs;

  @ViewChild('btnDropdownRef', { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

  constructor(private _eref: ElementRef, public translate : TranslateService) {
    this.svgs = SVGs;
  }

  ngAfterViewInit() {
    //For responsive scroll dropdown
    ConstantClass.placement =
      window.innerHeight < ConstantClass.innerWidth.sm ? ConstantClass.dropdownPosition.top : ConstantClass.dropdownPosition.bottom;

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

  //On apply Filter
  onApply() {
    this.filtredAttributes.emit(this.filterAttributes);
    this.dropdownPopoverShow = false;
  }

  //On clear filter
  onClear() {
    this.filterAttributes.map((data) => (data.isChecked = false));
    this.filtredAttributes.emit(this.filterAttributes);
    this.dropdownPopoverShow = false;
  }
}
