import { Component } from '@angular/core';
import { CommonService } from './helpers/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _c_: CommonService) {}
  onClick() {
    this._c_.notify.show('Hoş Geldiniz.');
    setTimeout(() => {
      this._c_.notify.hide();
    }, 3000);
  }
}
