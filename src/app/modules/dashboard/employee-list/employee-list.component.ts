import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/core/dashboard/services/api-call.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { SVGs } from 'src/app/shared/constants/svgs';
import { slideInAnimation } from './app.animation';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export class EmployeeListComponent implements OnInit {
  // isCheckBox = true;
  // totalCount: number;
  // itemsPerPage = 10;
  // itemsPerPageArr = [10, 20, 25];
  // searchText = 'ta';
  // sorting = '';
  // sortingField = '';

  public constant;
  rowsData: any = [];

  actions = [
    {
      title: ConstantClass.actions.edit,
      icon: SVGs.delete,
      isIcon: true,
    },
    {
      title: ConstantClass.actions.delete,
      icon: SVGs.delete,
      isIcon: true,
    },
  ];

  columns = [
    {
      title: 'Id',
      dataProperty: 'id',
      soremployeeTable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Name',
      dataProperty: 'name',
      soremployeeTable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Full Name',
      dataProperty: 'full_name',
      soremployeeTable: true,
      sorting: 'none',
      show: true,
    },
    {
      title: 'Owner_Login',
      dataProperty: 'login',
      icon: 'avatar_url',
      soremployeeTable: true,
      sorting: 'none',
      show: true,
    },
  ];

  constructor(
    public apiCallService: ApiCallService,
    private readonly cd: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    ConstantClass.employeeTable.totalCount = this.apiCallService.totalCount;
    this.constant = ConstantClass;
  }

  ngOnInit(): void {
    this.getRowsData(
      `q=a&page=1&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    );
    this.onResize(window);
  }

  getRowsData(url: string) {
    this.apiCallService.getConfig(url).subscribe((data: any) => {
      this.rowsData = [...data.items];
      this.rowsData.map((item: any) => {
        item['login'] = item.owner.login;
        item['avatar_url'] = item.owner.avatar_url;
      });
      console.log(this.rowsData);
      ConstantClass.employeeTable.totalCount = data.total_count;
      this.cd.detectChanges();
    });
  }

  onSortingEvent(column: any) {
    ConstantClass.employeeTable.sorting = column.sorting;
    ConstantClass.employeeTable.sortingField = column.dataProperty;

    this.getRowsData(
      `q=${ConstantClass.employeeTable.searchText}&sort=${ConstantClass.employeeTable.sortingField}&order=${ConstantClass.employeeTable.sorting}&page=1&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    );
  }

  @HostListener(ConstantClass.document.resize, ['$event.target'])
  onResize(event: any) {
    console.log(event.innerWidth);

    this.columns[2].show =
      event.innerWidth > ConstantClass.innerWidth.tablet ? true : false;
    this.columns[3].show =
      event.innerWidth > ConstantClass.innerWidth.mobile ? true : false;
    this.columns[0].show =
      event.innerWidth > ConstantClass.innerWidth.mobile ? true : false;
  }

  ngDoCheck(): void {}

  onPageChangeEvent(page: number) {
    // this.getRowsData(`per_page=${this.itemsPerPage}&page=${page}`);
    this.getRowsData(
      `q=${ConstantClass.employeeTable.searchText}&sort=${ConstantClass.employeeTable.sortingField}&order=${ConstantClass.employeeTable.sorting}&page=${page}&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    );
  }

  onSearchingEvent(searchText: string) {
    console.log(searchText);
    ConstantClass.employeeTable.searchText = searchText;
    this.getRowsData(
      `q=${ConstantClass.employeeTable.searchText}&sort=&order=&page=1&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    );
  }

  onAddEvent(event: any) {
    this.router.navigate([`./${RouterPathClass.addEmployee}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
