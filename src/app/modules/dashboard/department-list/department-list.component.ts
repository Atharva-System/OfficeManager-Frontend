import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/core/dashboard/Department/service/department.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { slideInAnimation } from '../employee-list/app.animation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export class DepartmentListComponent implements OnInit {
  public constant;
  public departmentSubscription!: Subscription;
  colspan!: number;

  constructor(
    public departmentService: DepartmentService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.constant = ConstantClass;
  }

  ngOnInit(): void {
    this.onResize(window);
    this.departmentService.getAllDepartment(
      `?Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
    );
    this.departmentSubscription = this.departmentService.state$.subscribe();
  }

  onSortingEvent(column: any) {
    ConstantClass.departmentTable.sorting = column.sorting;
    ConstantClass.departmentTable.sortingField = column.dataProperty;

    this.departmentService.getAllDepartment(
      `?Search=${ConstantClass.table.searchText}&Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}&SortingColumn=${ConstantClass.departmentTable.sortingField}&SortingDirection=${ConstantClass.departmentTable.sorting}`
    );
  }

  @HostListener(ConstantClass.document.resize, ['$event.target'])
  onResize(event: any) {
    this.departmentService.columns[1].show =
      event.innerWidth > ConstantClass.innerWidth.tablet ? true : false;
    let shownColumns = this.departmentService.columns.filter(
      (data) => data.show
    );
    this.colspan = shownColumns.length + 2;
  }

  onPageChangeEvent(page: number) {
    this.departmentService.getAllDepartment(
      `?Search=${ConstantClass.table.searchText}&Page_No=${page}&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
    );
    this.departmentService.state;
  }

  onSearchingEvent(searchText: string) {
    ConstantClass.table.searchText = searchText;
    this.departmentService.getAllDepartment(
      `?Search=${ConstantClass.table.searchText}&Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
    );
  }

  onAddEvent(event: any) {
    // this.departmentService.createDepartment('', {
    //   name: 'HR',
    //   description: 'HR',
    //   isActive: true,
    // });

    this.router.navigate([`./${RouterPathClass.addDepartment}`], {
      relativeTo: this.activatedRoute,
    });
  }

  onPageSizeChangeEvent(pageSize: number) {
    ConstantClass.departmentTable.itemsPerPage = pageSize;
    this.departmentService.getAllDepartment(
      `?Search=${ConstantClass.table.searchText}&Page_No=1&Page_Size=${ConstantClass.departmentTable.itemsPerPage}`
    );
  }

  onDelete(ids: any) {
    ids.forEach((element: any) => {
      this.departmentService.deleteDepartment(element.id);
    });
  }

  onEditEvent(index: number) {
    console.log(index);

    this.router.navigate([`./${RouterPathClass.addDepartment}`], {
      relativeTo: this.activatedRoute,
      queryParams: { i: index },
    });
  }

  ngOnDestroy(): void {
    this.departmentSubscription.unsubscribe();
    ConstantClass.table.searchText = '';
  }
}
