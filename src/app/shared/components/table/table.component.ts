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
  @Input() url: any;
  @Output() onSortingEvent = new EventEmitter<any>();
  @Input() newRowsData: any;

  isChecked = false;
  isSearch = true;

  filterAttributes;
  // rowActions = [
  //   {
  //     label: 'Edit',
  //     actionIdToReturn: 'edit',
  //     logoImageUrl: '...',
  //     showOption: (x) => true,
  //   },
  //   {
  //     label: 'Copy',
  //     actionIdToReturn: 'copy',
  //     logoImageUrl: '...',
  //     showOption: (x) => x.completed,
  //   },
  //   {
  //     label: 'Delete',
  //     actionIdToReturn: 'delete',
  //     logoImageUrl: '...',
  //     showOption: (x) => !x.isActive,
  //   },
  //   {
  //     label: 'Message',
  //     actionIdToReturn: 'message',
  //     logoImageUrl: '...',
  //     showOption: (x) => x.permitsMessaging,
  //   }
  // ];

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.filterAttributes = this.commonService.filterAttributes;
  }

  ngOnInit(): void {}

  //To get attribute of filter
  filtredAttributes(item: IFilter[]) {
    this.filterAttributes = item;
    console.log(this.filterAttributes);
  }

  //To sort perticular column
  onSorting(index: number) {
    // this.onSortingEvent.emit(index);

    this.columns[index].sorting =
      this.columns[index].sorting === 'asc'
        ? 'desc'
        : this.columns[index].sorting === 'desc'
        ? 'none'
        : 'asc';

    let sortedArray = (this.rowsData || []).sort((a: any, b: any) => {
      if (this.columns[index].sorting === 'asc') {
        return a[this.columns[index].dataProperty] >
          b[this.columns[index].dataProperty]
          ? 1
          : -1;
      } else if (this.columns[index].sorting === 'desc') {
        return a[this.columns[index].dataProperty] <
          b[this.columns[index].dataProperty]
          ? 1
          : -1;
      } else return 0;
    });
    this.rowsData = sortedArray;
  }

  //To change value according header checkbox
  onHeaderCheckboxChange(val: any) {
    this.rowsData.map((data: any) => (data['isChecked'] = val));
  }

  //To change value according rows checkbox
  onCheckboxChange() {
    this.isChecked = this.rowsData.every((data: any) => data.isChecked);
  }
}
