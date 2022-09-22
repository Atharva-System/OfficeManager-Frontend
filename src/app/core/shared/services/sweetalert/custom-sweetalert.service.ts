import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CustomSweetalertService {
  constructor() {}

  sweetAlertMethod(
    title: string,
    onConfirm: () => void,
    onDeny?: () => void,
    showDenyButton?: boolean,
    denyButtonText?: string,
    confirmButtonText?: string,
    confirmButtonColor?: string,
    reverseButtons?: boolean,
    focusDeny?: boolean
  ) {
    Swal.fire({
      title: title,
      showDenyButton: showDenyButton || true,
      denyButtonText: denyButtonText || 'NO',
      confirmButtonText: confirmButtonText || 'YES',
      confirmButtonColor: confirmButtonColor || 'white',
      reverseButtons: reverseButtons || true,
      focusDeny: focusDeny || true,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else {
        if (onDeny) onDeny();
      }
    });
  }
}
