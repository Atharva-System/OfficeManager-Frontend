import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/core/dashboard/services/api-call.service';
import { LayOutCommonService } from 'src/app/core/layout/services/common/common.service';
import { RouterPathClass } from 'src/app/shared/constants/route-path';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  // host: {
  //   class: 'add-employee-sidebar',
  // },
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private router: Router,
    public layoutCommonService: LayOutCommonService,
    private activatedRoute: ActivatedRoute,
    public apiCallService: ApiCallService
  ) {}
  ngOnInit(): void {}

  onClose() {
    this.router.navigate([`../`], {
      relativeTo: this.activatedRoute,
    });
  }
}
