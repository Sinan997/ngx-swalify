import Swal, { SweetAlertResult } from 'sweetalert2';
import { SwalifyPayload, SwalifyResponse } from '../models/confirmation';
import { firstValueFrom } from 'rxjs';

export const mapResponse = <T>(res: SweetAlertResult<any>) => {
  const response: SwalifyResponse<T> = {
    isConfirmed: res.isConfirmed,
    isDenied: res.isDenied,
    isDismissed: res.isDismissed,
    dismiss: res.dismiss,
    value: res.value || null,
  };

  return response;
};

export const getOptions = (payload?: SwalifyPayload) => {
  return {
    preConfirm: payload?.preConfirmObservable
      ? async () => {
          try {
            if (!payload.preConfirmObservable) return;
            return await firstValueFrom(payload.preConfirmObservable);
          } catch (error) {
            console.error(error);
            return null;
          }
        }
      : undefined,
    showLoaderOnConfirm: payload?.preConfirmObservable ? true : false,
    allowOutsideClick: () => !Swal.isLoading(),
    ...payload?.options,
  };
};
