import { Component } from '@angular/core';
import { App } from 'src/app/helpers/constants/app';
import { CommonService } from 'src/app/helpers/services/common.service';
import { AccessToken } from 'src/app/shared/classes/access-token';
import { LoginParameter } from 'src/app/shared/classes/login-parameter';
import { ISession } from 'src/app/shared/interfaces/session.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private _c_: CommonService) {}
  year: Date = new Date();
  formData: LoginParameter = new LoginParameter();

  async onLogin(e: any) {
    this._c_.notify.show('Giriş Yapılıyor.');

    this._c_
      .login({
        input: await this._c_.encryptedValue(this.formData.input),
        password: await this._c_.encryptedValue(this.formData.password),
      })
      .subscribe({
        next: (result) => {
          this._c_.notify.hide();
          if (!result.success) this._c_.notify.info(result.message);

          result.data.input = this.formData.input;
          let model: ISession<AccessToken> = {
            data: result.data,
            logged: true,
          };
          this._c_.setLocalStorage(App._T_SESSION, JSON.stringify(model));

          this._c_.router.navigate(['/']);
        },
        error: () => this._c_.notify.hide(),
      });
    e.preventDefault();
  }
}
