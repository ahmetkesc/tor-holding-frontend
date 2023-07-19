import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/helpers/services/common.service';
import { User } from 'src/app/shared/classes/users';
import { Table } from 'primeng/table';
import { IResult } from 'src/app/shared/interfaces/result.interface';
import { App } from 'src/app/helpers/constants/app';
@Component({
  selector: 'app-p-users',
  templateUrl: './p-users.component.html',
})
export class PUsersComponent implements OnInit {
  @ViewChild('pTable', { static: false }) pTable!: Table;
  constructor(private _c_: CommonService) {
    this.users = [];
  }
  users: User[] = [];
  selectedUsers: User[] = [];
  editForm: User = new User();
  p_dialog: boolean = false;

  onShowDialog() {
    this.p_dialog = true;
  }

  onUpdateStart() {
    try {
      if (this.selectedUsers.length == 0) return;
      const user: User = JSON.parse(JSON.stringify(this.selectedUsers[0]));
      if (!user) {
        this._c_.notify.info('Kullanıcı Bulunamadı.');
      }

      this.editForm = user;
      this.p_dialog = true;
    } catch (error: any) {
      this._c_.notify.error(error.toString());
    }
  }

  onDelete() {
    try {
      if (this.selectedUsers.length == 0) return;
      const user: User = JSON.parse(JSON.stringify(this.selectedUsers[0]));
      if (!user) {
        this._c_.notify.info('Kullanıcı Bulunamadı.');
      }

      this._c_.http
        .post<IResult<User[]>>(App.API + 'user/delete', user)
        .subscribe({
          next: (response) => {
            if (!response.success) this._c_.notify.info(response.message);
            if (response.success) this._c_.notify.success('Kullanıcı Silindi.');

            this._c_.refreshRoute();
          },
        });
    } catch (error: any) {
      this._c_.notify.error(error.toString());
    }
  }

  onRefresh() {
    this.ngOnInit();
  }
  onSave() {
    const valid = this._validation_callback();
    if (!valid) {
      this._c_.notify.info('Lütfen Gerekli Alanları Doldurunuz.');
      return;
    }
    console.log(this.editForm);
    this.editForm.id = this.editForm.id ? this.editForm.id : App.EMPTY_G;
    this._c_.http
      .post<IResult<User[]>>(
        `${App.API}user/${
          this.editForm.id !== App.EMPTY_G ? 'update' : 'insert'
        }`,
        this.editForm
      )
      .subscribe({
        next: (response) => {
          if (!response.success) this._c_.notify.info(response.message);
          if (response.success)
            this._c_.notify.success(
              this.editForm.id !== App.EMPTY_G
                ? 'Kullanıcı Güncellendi.'
                : 'Kullanıcı Eklendi.'
            );

          this._c_.refreshRoute();
        },
      });
  }

  onCancel() {
    this.p_dialog = false;
    this.editForm = new User();
  }

  _validation_callback() {
    if (this.editForm.adi == '') return false;
    if (this.editForm.soyadi == '') return false;
    if (this.editForm.eposta == '') return false;
    if (this.editForm.sifre == '') return false;

    return true;
  }
  initialize() {
    this._c_.http.get<IResult<User[]>>(App.API + 'user/getall').subscribe({
      next: async (response) => {
        this._c_.notify.hide();
        if (!response.success) this._c_.notify.info(response.message);
        this.users = await Promise.all(
          response.data.map(async (m) => {
            let user = m;
            m.eposta = await this._c_.decryptedValue(m.eposta);
            m.sifre = await this._c_.decryptedValue(m.sifre);

            return user;
          })
        );
      },
    });
  }

  ngOnInit(): void {
    this._c_.notify.show('Kullanıcılar Yükleniyor.');
    setTimeout(() => {
      this.initialize();
    }, 500);
  }
}
