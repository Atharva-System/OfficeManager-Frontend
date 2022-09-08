import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ApiCallService } from 'src/app/core/dashboard/services/api-call.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  isCheckBox = true;
  totalCount: number;
  newRowsData: any = [];
  itemsPerPage = 10;
  itemsPerPageArr = [10, 20, 25];
  searchText = 'ta';
  sorting = '';
  sortingField = '';

  actions = [
    {
      title: 'Edit',
      icon: 'assets/svg/delete.svg',
      isIcon: true,
    },
    {
      title: 'Delete',
      icon: 'assets/svg/delete.svg',
      isIcon: true,
    },
  ];

  // columns = [
  //   {
  //     title: 'First Name',
  //     dataProperty: 'first_name',
  //     sortable: true,
  //     sorting: 'none',
  //     show: true,
  //   },
  //   {
  //     title: 'Last Name',
  //     dataProperty: 'last_name',
  //     sortable: true,
  //     sorting: 'none',
  //     show: false,
  //   },
  //   {
  //     title: 'Email',
  //     dataProperty: 'email',
  //     sortable: true,
  //     sorting: 'none',
  //     show: true,
  //   },
  // ];

  columns = [
    {
      title: 'Id',
      dataProperty: 'id',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Name',
      dataProperty: 'name',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Full Name',
      dataProperty: 'full_name',
      sortable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Owner_Login',
      dataProperty: 'login',
      sortable: true,
      sorting: 'none',
      show: true,
    },
  ];

  rowsData: any = [];

  constructor(
    private apiCallService: ApiCallService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.totalCount = this.apiCallService.totalCount;
  }

  ngOnInit(): void {
    // this.getRowsData(`page=1&per_page=${this.itemsPerPage}`);
    this.getRowsData(`q=a&page=1&per_page=${this.itemsPerPage}`);
    this.onResize(window);
    // this.apiCallService
    //   .getConfig(`per_page=${this.totalCount}&page=1`)
    //   .subscribe((data: any) => {
    //     this.newRowsData = [...data?.data];
    //     this.cd.detectChanges();
    //   });
  }

  getRowsData(url: string) {
    this.apiCallService.getConfig(url).subscribe((data: any) => {
      // this.rowsData = [...data?.data];
      this.rowsData = [...data.items];
      this.rowsData.map((item: any) => {
        item['login'] = item.owner.login;
      });
      console.log(this.rowsData);
      // this.totalCount = data.total;
      this.totalCount = data.total_count;
      this.cd.detectChanges();
    });
  }

  onSortingEvent(column: any) {
    // this.apiCallService
    //   .getConfig(`per_page=${this.totalCount}&page=1`)
    //   .subscribe((data: any) => {
    //     this.newRowsData = [...data?.data];
    //     this.cd.detectChanges();
    //   });
    // this.getRowsData(`per_page=${this.totalCount}&page=1`);

    this.sorting = column.sorting;
    this.sortingField = column.dataProperty;

    this.getRowsData(
      `q=${this.searchText}&sort=${this.sortingField}&order=${this.sorting}&page=1&per_page=${this.itemsPerPage}`
    );
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(event: any) {
    console.log(event.innerWidth);

    this.columns[2].show = event.innerWidth > 850 ? true : false;
    this.columns[3].show = event.innerWidth > 500 ? true : false;
    this.columns[0].show = event.innerWidth > 500 ? true : false;
  }

  ngDoCheck(): void {
    // console.log(this.rowsData);
  }

  onPageChangeEvent(page: number) {
    // this.getRowsData(`per_page=${this.itemsPerPage}&page=${page}`);
    this.getRowsData(
      `q=${this.searchText}&sort=${this.sortingField}&order=${this.sorting}&page=${page}&per_page=${this.itemsPerPage}`
    );
  }
}
