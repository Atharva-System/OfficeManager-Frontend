import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConstantClass } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastrService: ToastrService) {}

  showToastr(type: string, msg: string) {
    switch (type) {
      case ConstantClass.notificationType.success:
        this.toastrService.success(msg, '', {
          toastClass: 'ngx-toastr custom-toastr-success-class',
        });
        break;
      case ConstantClass.notificationType.warning:
        this.toastrService.warning(msg, '', {
          toastClass: 'ngx-toastr custom-toastr-warning-class',
        });
        break;
      case ConstantClass.notificationType.error:
        this.toastrService.error(msg, '', {
          toastClass: 'ngx-toastr custom-toastr-error-class',
        });
        break;
      default:
        this.toastrService.info(msg, '', {
          toastClass: 'ngx-toastr custom-toastr-info-class',
        });
    }
  }
}
