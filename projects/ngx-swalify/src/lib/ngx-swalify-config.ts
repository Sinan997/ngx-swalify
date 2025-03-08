import { Injectable } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NgxSwalifyConfig {
  confirm: SweetAlertOptions | undefined;
  delete: SweetAlertOptions | undefined;
  success: SweetAlertOptions | undefined;
  info: SweetAlertOptions | undefined;
  error: SweetAlertOptions | undefined;
}
