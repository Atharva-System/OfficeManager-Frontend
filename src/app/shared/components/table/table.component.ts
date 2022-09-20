import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IFilter } from 'src/app/core/shared/models/filter';
import { CommonService } from 'src/app/core/shared/services/common/common.service';
import { ConstantClass } from '../../constants/constants';
import { SVGs } from '../../constants/svgs';
import Swal from 'sweetalert2';

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
  @ViewChild('searchText') searchText: any;

  selectedIds: any = [];
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
  public constant;
  public svgs;

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private _eref: ElementRef
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
  }

  //To change value according header checkbox
  onHeaderCheckboxChange(val: any) {
    this.selectedIds = [];
    let idTitle = this.columns.find((data: any) => data.title === 'Id');

    this.rowsData.map((data: any) => {
      data['isChecked'] = val;
      if (data.isChecked) {
        this.selectedIds.push({ id: data[idTitle.dataProperty] });
      } else {
        this.selectedIds = [];
      }
    });
  }

  //To change value according rows checkbox
  onCheckboxChange(index: number) {
    this.isChecked = this.rowsData.every((data: any) => data.isChecked);

    let idTitle = this.columns.find((data: any) => data.title === 'Id');

    if (
      this.selectedIds.some(
        (data: any) => data.id === this.rowsData[index][idTitle.dataProperty]
      )
    ) {
      if (!this.rowsData[index].isChecked) {
        let findedIndex = this.selectedIds.findIndex(
          (data: any) => data.id === this.rowsData[index][idTitle.dataProperty]
        );
        this.selectedIds.splice(findedIndex, 1);
      }
    } else if (this.rowsData[index].isChecked) {
      this.selectedIds.push({
        id: this.rowsData[index][idTitle.dataProperty],
      });
    }
  }

  onReset() {
    this.selectedIds = [];
    this.rowsData.forEach((element: any) => (element.isChecked = false));
    this.isChecked = false;
  }

  onItemClick(page: number) {
    this.itemsPerPage = page;
    this.onPageSizeChangeEvent.emit(this.itemsPerPage);
    // ConstantClass.employeeTable.itemsPerPage = this.itemsPerPage;
    // this.url = `page=1&per_page=${this.itemsPerPage}`;
  }

  onPageChange(event: any) {
    this.p = event;
    this.onPageChangeEvent.emit(this.p);
    this.selectedIds = [];
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
  onKeyupOnSearch(event: any) {
    this.p = 1;
    this.onSearchingEvent.emit(event.target.value);
  }

  //To add employee
  onAdd() {
    this.onAddEvent.emit();
  }

  onDelete(ids?: any[]) {
    if (!ids?.length) {
      ids = this.selectedIds;
    }

    Swal.fire({
      title: 'Do you want delete selected departments?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'gray',
      denyButtonText: `No`,
      reverseButtons : true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteEvent.emit(ids);
        if (!ids?.length) {
          this.selectedIds = [];
          this.isChecked = false;
        }
      }
    });
  }

  onEdit(column: any, index: number) {
    if (column.isEdit) {
      this.onEditEvent.emit(index);
    }
  }

  onAction(action: string, index: number) {    
    let idTitle = this.columns.find((data: any) => data.title === 'Id');

    if (action === ConstantClass.actions.delete) {
      this.onDelete([{id : this.rowsData[index][idTitle.dataProperty]}]);
    }
  }
}
