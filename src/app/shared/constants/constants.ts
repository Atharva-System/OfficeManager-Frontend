import { FormGroup, Validators } from '@angular/forms';

export class ConstantClass {
  static escapeKey = 'escape';
  static darkClass = 'dark';
  static lightClass = 'light';
  static innerWidth = {
    sm: 368,
    mobile: 500,
    tablet: 850,
  };
  static dropdownPosition = {
    top: 'top-start',
    bottom: 'bottom-start',
  };
  static document = {
    click: 'document:click',
    keydown: 'document:keydown',
    resize: 'window:resize',
  };
  static placement: any = 'bottom-start';

  //validators
  static validators = Validators;
  static required = 'required';
  static pattern = 'pattern';

  //forms
  static signinForm: FormGroup;
  static forgotPasswordForm: FormGroup;
  static addDepartmentForm: FormGroup;

  //asc-desc
  static asc = 'Asc';
  static desc = 'Desc';

  //toastr
  static notificationType = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error',
  };

  //token on localstorage
  static token = 'token';
  static refreshToken = 'refreshToken';

  //Table Related
  static actions = {
    edit: 'Edit',
    delete: 'Delete',
  };
  static employeeTable = {
    isCheckBox: true,
    itemsPerPage: 20,
    itemsPerPageArr: [10, 20, 25],
    // searchText: '',
    sorting: '',
    sortingField: '',
  };
  static departmentTable = {
    isCheckBox: true,
    itemsPerPage: 5,
    itemsPerPageArr: [5, 10, 15],
    // searchText: '',
    sorting: '',
    sortingField: '',
  };
  static table = {
    searchText: '',
  };

  static editDepartmentIndex: number | null;
  static idColumnTitle = 'Id';
}
