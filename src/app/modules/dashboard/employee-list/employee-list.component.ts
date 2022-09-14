import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/dashboard/Employee/service/employee.service';
import { ApiCallService } from 'src/app/core/dashboard/services/api-call.service';
import { ApiService } from 'src/app/core/shared/services/api/api.service';
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
  public constant;
  rowsData = [];
  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.constant = ConstantClass;
  }

  ngOnInit(): void {
    this.onResize(window);
  }

  // getRowsData(url: string) {
  //   // this.employeeService.getAllEmployee(url).subscribe((data: any) => {
  //   //   this.rowsData = [...data.data];
  //   //   // this.rowsData.map((item: any) => {
  //   //   //   item['login'] = item.owner.login;
  //   //   //   item['avatar_url'] = item.owner.avatar_url;
  //   //   // });
  //   this.cd.detectChanges();
  //   // });
  // }

  onSortingEvent(column: any) {
    ConstantClass.employeeTable.sorting = column.sorting;
    ConstantClass.employeeTable.sortingField = column.dataProperty;

    // this.getRowsData(
    //   `q=${ConstantClass.employeeTable.searchText}&sort=${ConstantClass.employeeTable.sortingField}&order=${ConstantClass.employeeTable.sorting}&page=1&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    // );
  }

  @HostListener(ConstantClass.document.resize, ['$event.target'])
  onResize(event: any) {
    console.log(event.innerWidth);

    this.employeeService.columns[2].show =
      event.innerWidth > ConstantClass.innerWidth.tablet ? true : false;
    this.employeeService.columns[3].show =
      event.innerWidth > ConstantClass.innerWidth.mobile ? true : false;
    this.employeeService.columns[0].show =
      event.innerWidth > ConstantClass.innerWidth.mobile ? true : false;
  }

  onPageChangeEvent(page: number) {
    // this.getRowsData(
    //   `q=${ConstantClass.employeeTable.searchText}&sort=${ConstantClass.employeeTable.sortingField}&order=${ConstantClass.employeeTable.sorting}&page=${page}&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    // );
    this.employeeService.getAllEmployee(
      `?Search=${ConstantClass.employeeTable.searchText}&Page_No=${page}&Page_Size=${ConstantClass.employeeTable.itemsPerPage}`
    );
    this.employeeService.state;
  }

  onSearchingEvent(searchText: string) {
    ConstantClass.employeeTable.searchText = searchText;
    this.employeeService.getAllEmployee(
      `?Search=${ConstantClass.employeeTable.searchText}&Page_No=1&Page_Size=${ConstantClass.employeeTable.itemsPerPage}`
    );
    // this.getRowsData(
    //   `q=${ConstantClass.employeeTable.searchText}&sort=&order=&page=1&per_page=${ConstantClass.employeeTable.itemsPerPage}`
    // );
  }

  onAddEvent(event: any) {
    this.router.navigate([`./${RouterPathClass.addEmployee}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
