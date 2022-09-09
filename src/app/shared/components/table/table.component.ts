import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IFilter } from 'src/app/core/shared/models/filter';
import { CommonService } from 'src/app/core/shared/services/common/common.service';
import { ConstantClass } from '../../constants/constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: any;
  @Input() rowsData: any;
  @Input() isCheckBox: any;
  @Input() actions: any;
  @Output() onSortingEvent = new EventEmitter<any>();
  @Output() onSearchingEvent = new EventEmitter<any>();
  @Input() newRowsData: any;
  @ViewChild('searchText') searchText: any;

  isChecked = false;
  isSearch = true;

  dropdownPopoverShow = false;
  p: any = 1;
  @Input() totalCount: any;
  @Input() itemsPerPage: any;
  @Input() itemsPerPageArr: any;
  @Output() onPageChangeEvent = new EventEmitter<any>();
  @Output() onAddEvent = new EventEmitter<any>();

  filterAttributes;
  public constant;

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.filterAttributes = this.commonService.filterAttributes;
    this.constant = ConstantClass;
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log();
  }

  //To get attribute of filter
  filtredAttributes(item: IFilter[]) {
    this.filterAttributes = item;
    console.log(this.filterAttributes);
  }

  //To sort perticular column
  onSorting(index: number) {
    // if (!this.newRowsData.length) {
    //   return;
    // }

    this.columns[index].sorting =
      this.columns[index].sorting === ConstantClass.asc
        ? ConstantClass.desc
        : ConstantClass.asc;

    this.onSortingEvent.emit(this.columns[index]);

    // console.log(this.newRowsData);

    // let sortedArray = (this.newRowsData || []).sort((a: any, b: any) => {
    //   if (this.columns[index].sorting === 'asc') {
    //     return a[this.columns[index].dataProperty] >
    //       b[this.columns[index].dataProperty]
    //       ? 1
    //       : -1;
    //   } else if (this.columns[index].sorting === 'desc') {
    //     return a[this.columns[index].dataProperty] <
    //       b[this.columns[index].dataProperty]
    //       ? 1
    //       : -1;
    //   } else return 0;
    // });
    // this.rowsData = sortedArray;
  }

  //To change value according header checkbox
  onHeaderCheckboxChange(val: any) {
    this.rowsData.map((data: any) => (data['isChecked'] = val));
  }

  //To change value according rows checkbox
  onCheckboxChange() {
    this.isChecked = this.rowsData.every((data: any) => data.isChecked);
    console.log(this.rowsData);
  }

  onItemClick(page: number) {
    this.itemsPerPage = page;
    // this.url = `page=1&per_page=${this.itemsPerPage}`;
    // this.showConfig();
  }

  onPageChange(event: any) {
    this.p = event;
    this.onPageChangeEvent.emit(this.p);
    // this.showConfig();
  }

  //To toggle DropDown
  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  //On search box Key Enter
  onKeyuOnSearch(event: any) {
    this.onSearchingEvent.emit(event.target.value);
  }

  //To add employee
  onAdd() {
    this.onAddEvent.emit();
  }
}
