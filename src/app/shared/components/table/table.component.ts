import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IFilter } from 'src/app/core/shared/models/filter';
import { CommonService } from 'src/app/core/shared/services/common/common.service';
import { ConstantClass } from '../../constants/constants';
import { SVGs } from '../../constants/svgs';
import { CustomSweetalertService } from 'src/app/core/shared/services/sweetalert/custom-sweetalert.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: any;
  @Input() rowsData: any;
  @Input() isCheckBox: any;
  @Input() actions: any;
  @Output() onSortingEvent = new EventEmitter<any>();
  @Output() onSearchingEvent = new EventEmitter<any>();
  @Output() onAddEvent = new EventEmitter<any>();
  @Output() onEditEvent = new EventEmitter<any>();
  @Output() onDeleteEvent = new EventEmitter<any>();
  @Input() newRowsData: any;
  @Input() colspan!: number;

  isChecked = false;
  isSearch = true;

  dropdownPopoverShow = false;
  @Input() p: number | undefined;
  @Input() totalCount: any;
  @Input() itemsPerPage: any;
  @Input() itemsPerPageArr: any;
  @Output() onPageChangeEvent = new EventEmitter<any>();
  @Output() onPageSizeChangeEvent = new EventEmitter<any>();

  filterAttributes;

  //Constants
  public constant;
  public svgs;

  constructor(
    private commonService: CommonService,
    private _eref: ElementRef,
    private customSweetalertService: CustomSweetalertService
  ) {
    this.filterAttributes = this.commonService.filterAttributes;
    this.constant = ConstantClass;
    this.svgs = SVGs;
  }

  //To get attribute of filter
  filtredAttributes(item: IFilter[]) {
    this.filterAttributes = item;
    console.log(this.filterAttributes);
  }

  //To sort perticular column
  onSorting(index: number) {
    this.columns[index].sorting =
      this.columns[index].sorting === ConstantClass.asc
        ? ConstantClass.desc
        : ConstantClass.asc;

    this.onSortingEvent.emit(this.columns[index]);
    ConstantClass.table.selectedIds = [];
  }

  //To change value according header checkbox
  onHeaderCheckboxChange(val: any) {
    ConstantClass.table.selectedIds = [];
    let idTitle = this.columns.find(
      (data: any) => data.title === ConstantClass.idColumnTitle
    );

    this.rowsData.map((data: any) => {
      data['isChecked'] = val;
      if (data.isChecked) {
        ConstantClass.table.selectedIds.push({
          id: data[idTitle.dataProperty],
        });
      } else {
        ConstantClass.table.selectedIds = [];
      }
    });
  }

  //To change value according rows checkbox
  onCheckboxChange(index: number) {
    this.isChecked = this.rowsData.every((data: any) => data.isChecked);

    let idTitle = this.columns.find((data: any) => data.title === 'Id');

    if (
      ConstantClass.table.selectedIds.some(
        (data: any) => data.id === this.rowsData[index][idTitle.dataProperty]
      )
    ) {
      if (!this.rowsData[index].isChecked) {
        let findedIndex = ConstantClass.table.selectedIds.findIndex(
          (data: any) => data.id === this.rowsData[index][idTitle.dataProperty]
        );
        ConstantClass.table.selectedIds.splice(findedIndex, 1);
      }
    } else if (this.rowsData[index].isChecked) {
      ConstantClass.table.selectedIds.push({
        id: this.rowsData[index][idTitle.dataProperty],
      });
    }
  }

  onReset() {
    ConstantClass.table.selectedIds = [];
    this.rowsData.forEach((element: any) => (element.isChecked = false));
    this.isChecked = false;
  }

  onItemClick(page: number) {
    this.itemsPerPage = page;
    this.onPageSizeChangeEvent.emit(this.itemsPerPage);
    this.dropdownPopoverShow = false;
    ConstantClass.table.selectedIds = [];
  }

  onPageChange(event: any) {
    this.p = event;
    this.onPageChangeEvent.emit(this.p);
    ConstantClass.table.selectedIds = [];
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

  //On search box Key Enter
  onKeyupOnSearch(event?: any) {
    this.p = 1;
    this.onSearchingEvent.emit(ConstantClass.table.searchText);
    ConstantClass.table.selectedIds = [];
  }

  onClearFilter() {
    ConstantClass.table.searchText = '';
    this.onKeyupOnSearch();
  }

  //To add employee
  onAdd() {
    this.onAddEvent.emit();
  }

  onDelete(ids?: any[]) {
    if (!ids?.length) {
      ids = ConstantClass.table.selectedIds;
      console.log(ids);
    }

    this.customSweetalertService.sweetAlertMethod(
      'Do you really want to delete the selected record?',
      () => {
        this.onDeleteEvent.emit(ids);
        ConstantClass.table.selectedIds = [];
        this.isChecked = false;
      }
    );
  }

  onEdit(column: any, index: number) {
    if (column.isEdit) {
      this.onEditEvent.emit(index);
    }
  }

  onAction(action: string, index: number) {
    let idTitle = this.columns.find(
      (data: any) => data.title === ConstantClass.idColumnTitle
    );

    if (action === ConstantClass.actions.delete) {
      this.onDelete([{ id: this.rowsData[index][idTitle.dataProperty] }]);
    }
  }
}
