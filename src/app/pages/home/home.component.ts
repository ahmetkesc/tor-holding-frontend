import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { App } from 'src/app/helpers/constants/app';
import { CommonService } from 'src/app/helpers/services/common.service';
import { AccessToken } from 'src/app/shared/classes/access-token';
import { UserLoginLog } from 'src/app/shared/classes/user-login-log';
import { User } from 'src/app/shared/classes/users';
import { IResult } from 'src/app/shared/interfaces/result.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private _c_: CommonService) {}
  tumu: UserLoginLog[] = [];
  kendi: UserLoginLog[] = [];
  users: User[] = [];
  chart: any[] = [];

  t_user: number = 0;
  t_logged: number = 0;
  t_self: number = 0;

  ngOnInit(): void {
    const _ = this._c_.getSession<AccessToken>();

    let request = [
      this._c_.http.get<IResult<UserLoginLog[]>>(App.API + 'userll/getall'),
      this._c_.http.get<IResult<UserLoginLog[]>>(
        App.API + 'userll/getuserlogbyeposta',
        {
          params: { eposta: _?.data.input || '' },
        }
      ),
      this._c_.http.get<IResult<User[]>>(App.API + 'user/getall'),
    ];

    forkJoin(request)
      .pipe(
        map((response) => {
          return {
            tumu: <IResult<UserLoginLog[]>>(<unknown>response[0]),
            kendi: <IResult<UserLoginLog[]>>(<unknown>response[1]),
            kullanicilar: <IResult<User[]>>(<unknown>response[2]),
          };
        })
      )
      .subscribe({
        next: (response) => {
          if (response.tumu.success) {
            this.tumu = response.tumu.data;
            this.t_logged = this.tumu.length;
          }
          if (response.kendi.success) {
            this.kendi = response.kendi.data;
            this.t_self = this.kendi.length;
          }
          if (response.kullanicilar.success) {
            this.users = response.kullanicilar.data;
            this.t_user = this.users.length;
          }
        },
      });
  }
}
