import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDepartment } from 'src/app/core/dashboard/Department/model/department';
import { DepartmentService } from 'src/app/core/dashboard/Department/service/department.service';
import { CommonService } from 'src/app/core/shared/services/common/common.service';
import { CustomToastrService } from 'src/app/core/shared/services/toastr/custom-toastr.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { SVGs } from 'src/app/shared/constants/svgs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  public svgs;
  public constant;
  public routeConstant;
  departments: IDepartment[] = [];

  //Array of object for showing validation message in loop
  validationMessages = {
    id: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
    name: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
    description: [
      { type: ConstantClass.required, message: 'MESSAGE.REQUIRED' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public departmentService: DepartmentService
  ) {
    //Initialize signin form
    this.initialization();
    //constants
    this.constant = ConstantClass;
    this.routeConstant = RouterPathClass;
    this.svgs = SVGs;

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      ConstantClass.editDepartmentIndex = params['i'];
    });
  }

  ngOnInit(): void {
    if (ConstantClass.editDepartmentIndex) {
      this._addDepartment['id'].addValidators(
        ConstantClass.validators.required
      );

      const editDepartmentIndex = ConstantClass.editDepartmentIndex;
      setTimeout(() => {
        ConstantClass.addDepartment.patchValue(
          this.departmentService.state.items[editDepartmentIndex]
        );
        this._addDepartment['id'].updateValueAndValidity();
      }, 1000);
    }
  }

  //Initialize signin form
  initialization() {
    ConstantClass.addDepartment = this.formBuilder.group({
      id: [''],
      name: ['', [ConstantClass.validators.required]],
      description: ['', [ConstantClass.validators.required]],
    });
  }

  //Get all controls
  get _addDepartment() {
    return ConstantClass.addDepartment.controls;
  }

  //On submit signin form
  onSubmit(val: any) {
    this.departmentService.isFormSubmitted = true;

    if (ConstantClass.addDepartment.invalid) {
      return;
    }

    let department: IDepartment = {
      id: this._addDepartment['id']?.value,
      name: this._addDepartment['name']?.value,
      description: this._addDepartment['description']?.value,
    };

    if (ConstantClass.editDepartmentIndex) {
      this.departmentService.updateDepartment('', department);
      ConstantClass.editDepartmentIndex = null;
      this._addDepartment['id'].clearValidators();
      // this._addDepartment['id'].updateValueAndValidity();
    } else this.departmentService.createDepartment('', department);

    //To navigate to back
    this.router.navigate([`../`], {
      relativeTo: this.activatedRoute,
    });

    //To clear data on form
    this.initialization();
    this.departmentService.isFormSubmitted = false;
  }

  onClose() {
    this.router.navigate([`../`], {
      relativeTo: this.activatedRoute,
    });
  }
}
