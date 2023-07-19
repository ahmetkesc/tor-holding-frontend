import { Injectable } from '@angular/core';
import { HotToastService, ToastOptions } from '@ngneat/hot-toast';
import { Loading } from 'notiflix';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private _n_: HotToastService) {}

  private readonly _toastOptions: ToastOptions<string> = {
    dismissible: true,
    position: 'top-center',
    className: 'toast-icon-center',
  };

  show = (message: string = 'İşlem yapılıyor. Lütfen bekleyiniz.') =>
    Loading.hourglass(message);

  hide = () => Loading.remove();

  success = (message: string) => this._n_.success(message, this._toastOptions);
  info = (message: string) => this._n_.info(message, this._toastOptions);
  error = (message: string) => this._n_.error(message, this._toastOptions);
}
