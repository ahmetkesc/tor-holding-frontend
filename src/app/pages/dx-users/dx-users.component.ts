import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { App } from 'src/app/helpers/constants/app';
import { CommonService } from 'src/app/helpers/services/common.service';
import { User } from 'src/app/shared/classes/users';
import { IResult } from 'src/app/shared/interfaces/result.interface';

@Component({
  selector: 'app-dx-users',
  templateUrl: './dx-users.component.html',
})
export class DxUsersComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid!: DxDataGridComponent;
  constructor(private _c_: CommonService) {
    this.users = [];
  }

  users: User[] = [];
  editForm: User = new User();

  onShowDialog = () => this.grid.instance.addRow();
  onUpdateStart = () => {
    const rowIndex = this.grid.instance.getRowIndexByKey(
      this.grid.instance.getSelectedRowKeys()[0]
    );
    console.log(this.grid.instance.getSelectedRowKeys());
    if (rowIndex < 0) return;

    this.grid.instance.editRow(rowIndex);
  };

  onDelete = () => {
    const selectedRowsData = this.grid.instance.getSelectedRowsData();
    if (selectedRowsData.length == 0) return;

    const user: User = JSON.parse(JSON.stringify(selectedRowsData[0]));

    this._c_.http
      .post<IResult<User[]>>(App.API + 'user/delete', user)
      .subscribe({
        next: (response) => {
          if (!response.success) this._c_.notify.info(response.message);
          if (response.success) this._c_.notify.success('Kullanıcı Silindi.');

          this._c_.refreshRoute();
        },
      });
  };
  onRefresh = () => {
    this.ngOnInit();
  };

  onSave = () => {
    this.grid.instance.saveEditData();
  };

  onCancel = () => {
    this.grid.instance.cancelEditData();
  };

  onRowInserted(e: any) {
    const model: User = e.data;
    console.log(model);
    this._c_.http
      .post<IResult<User[]>>(App.API + 'user/insert', model)
      .subscribe({
        next: (response) => {
          if (!response.success) this._c_.notify.info(response.message);
          if (response.success) this._c_.notify.success('Kullanıcı Eklendi.');

          this._c_.refreshRoute();
        },
      });
  }
  onRowUpdated(e: any) {
    const model: User = e.data;
    this._c_.http
      .post<IResult<User[]>>(App.API + 'user/update', model)
      .subscribe({
        next: (response) => {
          if (!response.success) this._c_.notify.info(response.message);
          if (response.success)
            this._c_.notify.success('Kullanıcı Güncellendi.');

          this._c_.refreshRoute();
        },
      });
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
