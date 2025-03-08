import { Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

export interface SwalifyPayload {
  options?: SweetAlertOptions;
  preConfirmObservable?: Observable<unknown>;
}

export interface SwalifyResponse<T = unknown> {
  isConfirmed: boolean;
  isDenied: boolean;
  isDismissed: boolean;
  dismiss?: Swal.DismissReason;
  value: T | null;
}
