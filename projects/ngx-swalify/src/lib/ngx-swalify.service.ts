import { inject, Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalifyPayload } from './models/confirmation';
import { getOptions, mapResponse } from './utils/swalify-utils';
import { NgxSwalifyConfig } from './ngx-swalify-config';

@Injectable({ providedIn: 'root' })
export class NgxSwalifyService {
  protected readonly ngxSwalifyConfig = inject(NgxSwalifyConfig);

  fire<T>(payload?: SwalifyPayload) {
    return this.show<T>(payload);
  }

  confirm<T>(payload?: SwalifyPayload) {
    const options = { 
      ...this.ngxSwalifyConfig.confirm,
      ...payload?.options,
    } as SweetAlertOptions;

    return this.show<T>({
      options,
      preConfirmObservable: payload?.preConfirmObservable,
    });
  }

  delete<T>(payload?: SwalifyPayload) {
    const options = {
      ...this.ngxSwalifyConfig.delete,
      ...payload?.options,
    } as SweetAlertOptions;

    return this.show<T>({
      options,
      preConfirmObservable: payload?.preConfirmObservable,
    });
  }

  success<T>(payload?: SwalifyPayload) {
    const options = {
      ...this.ngxSwalifyConfig.success,
      ...payload?.options,
    } as SweetAlertOptions;

    return this.show<T>({
      options,
      preConfirmObservable: payload?.preConfirmObservable,
    });
  }

  info<T>(payload?: SwalifyPayload) {
    const options = {
      ...this.ngxSwalifyConfig.info,
      ...payload?.options,
    } as SweetAlertOptions;

    return this.show<T>({
      options,
      preConfirmObservable: payload?.preConfirmObservable,
    });
  }

  error<T>(payload?: SwalifyPayload) {
    const options = {
      ...this.ngxSwalifyConfig.error,
      ...payload?.options,
    } as SweetAlertOptions;

    return this.show<T>({
      options,
      preConfirmObservable: payload?.preConfirmObservable,
    });
  }

  private show<T>(payload?: SwalifyPayload) {
    return from(Swal.fire(getOptions(payload))).pipe(map((res) => mapResponse<T>(res)));
  }
}
