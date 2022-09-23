import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDepartment } from 'src/app/core/dashboard/Department/model/department';
import { DepartmentService } from 'src/app/core/dashboard/Department/service/department.service';
import { CustomSweetalertService } from 'src/app/core/shared/services/sweetalert/custom-sweetalert.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { RouterPathClass } from 'src/app/shared/constants/route-path';
import { SVGs } from 'src/app/shared/constants/svgs';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  //Constants
  public svgs;
  public constant;
  public routeConstant;
  //To validate on click on submit
  isFormSubmitted = false;
  isSpin = false;

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
    public departmentService: DepartmentService,
    private _eref: ElementRef,
    private customSweetalertService: CustomSweetalertService
  ) {
    //Initialize signin form
    this.initialization();
    //constants
    this.constant = ConstantClass;
    this.routeConstant = RouterPathClass;
    this.svgs = SVGs;

    //To check isEditForm (By get queryParams)
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      ConstantClass.editDepartmentIndex = params[ConstantClass.indexEditUrl];
    });
  }

  ngOnInit(): void {
    //If edit form then patch value and setTimeout bcz data got on little bit of delay
    if (ConstantClass.editDepartmentIndex) {
      const editDepartmentIndex = ConstantClass.editDepartmentIndex;
      setTimeout(() => {
        ConstantClass.addDepartmentForm.patchValue(
          this.departmentService.state.items[editDepartmentIndex]
        );
      }, 1500);
    }

    //Add noScroll class on open sidebar
    document.body.classList.add(ConstantClass.bodyNoScrollClass);
  }

  //Initialize addDepartmentForm
  initialization() {
    ConstantClass.addDepartmentForm = this.formBuilder.group({
      id: [''],
      name: ['', [ConstantClass.validators.required]],
      description: ['', [ConstantClass.validators.required]],
    });
  }

  //To close sidebar on click on backdrop
  @HostListener(ConstantClass.document.click, ['$event'])
  public closeSideBar(event: any) {
    if (
      !this._eref.nativeElement.contains(event.target) &&
      !event.target.innerText
    ) {
      this.onClose();
    }
  }

  //On scroll addDepartmentForm
  @HostListener(ConstantClass.document.scroll, ['$event'])
  scrollHandler(event: any) {
    //Store numbers for show shadow in top (In footer) and botton (In header)
    ConstantClass.sideBar.scrollTop = event.target.scrollTop;
    ConstantClass.sideBar.scrollHeight = event.target.scrollHeight;
    ConstantClass.sideBar.offsetHeight = event.target.offsetHeight;
  }

  //Get all controls
  get _addDepartment() {
    return ConstantClass.addDepartmentForm.controls;
  }

  //On submit addDepartmentForm form
  onSubmit(val: any) {
    //If invalid
    if (ConstantClass.addDepartmentForm.invalid) {
      //To show error msg
      this.isFormSubmitted = true;
      return;
    }

    this.isSpin = true;

    //To store data in object
    let department: IDepartment = {
      id: this._addDepartment['id']?.value,
      name: this._addDepartment['name']?.value,
      description: this._addDepartment['description']?.value,
    };

    setTimeout(() => {
      //Condition for edit or add
      if (ConstantClass.editDepartmentIndex) {
        //To update department
        this.departmentService.updateDepartment('', department);
        //To clear edit id
        ConstantClass.editDepartmentIndex = null;
      }
      //To add department
      else this.departmentService.createDepartment('', department);

      //To navigate to back
      this.router.navigate([`../`], {
        relativeTo: this.activatedRoute,
      });
    }, 400);

    //To clear data on form
    ConstantClass.addDepartmentForm.reset();
    this.isFormSubmitted = false;
    //To close bulkbar
    ConstantClass.table.selectedIds = [];
    //To uncheck header checkbox
    ConstantClass.table.isHeaderChecked = false;
  }

  //To close sidebar (or component)
  onClose() {
    //Condition for done any changes in form
    if (ConstantClass.addDepartmentForm.dirty) {
      //To take confirmation on close
      this.customSweetalertService.sweetAlertMethod(
        'MESSAGE.ON_CLOSE_SIDEBAR',
        () => {
          //If yes
          this.router.navigate([`../`], {
            relativeTo: this.activatedRoute,
          });
        },
        () => {
          //If no
          return;
        }
      );
    } else {
      //If not then directly back
      this.router.navigate([`../`], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  //To delete record
  onDelete() {
    //To take confirmation on delete
    this.customSweetalertService.sweetAlertMethod(
      'MESSAGE.ON_DELETE_RECORD',
      () => {
        //If yes
        this.departmentService.deleteDepartment(
          this._addDepartment['id'].value
        );
        this.onClose();
      }
    );
  }

  ngOnDestroy(): void {
    //Remove noScroll class on close sidebar
    document.body.classList.remove(ConstantClass.bodyNoScrollClass);
  }
}
