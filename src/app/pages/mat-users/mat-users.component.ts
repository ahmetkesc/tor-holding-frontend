import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/helpers/services/common.service';
import { User } from 'src/app/shared/classes/users';
import { MatUserDialogComponent } from './mat-users-dialog.component';
import { IResult } from 'src/app/shared/interfaces/result.interface';
import { App } from 'src/app/helpers/constants/app';

@Component({
  selector: 'app-mat-users',
  templateUrl: './mat-users.component.html',
})
export class MatUsersComponent implements OnInit {
  constructor(private _c_: CommonService, private dialog: MatDialog) {}
  users: User[] = [];
  editForm: User = new User();
  p_dialog: boolean = false;
  columns: string[] = [
    'select',
    'adi',
    'soyadi',
    'adres',
    'cep',
    'eposta',
    'sifre',
  ];
  ds_mat_table = new MatTableDataSource<User>(this.users);
  selection = new SelectionModel<User>(false, []);

  onShowDialog() {
    const dialogRef = this.dialog.open(MatUserDialogComponent, {
      data: this.editForm,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        this.editForm = new User();
        return;
      }
      result.id = App.EMPTY_G;

      this._c_.http
        .post<IResult<User[]>>(App.API + 'user/insert', result)
        .subscribe({
          next: (response) => {
            if (!response.success) this._c_.notify.info(response.message);
            if (response.success) this._c_.notify.success('Kullanıcı Eklendi.');

            this._c_.refreshRoute();
          },
        });
    });
  }

  onUpdateStart() {
    try {
      if (this.selection.selected.length == 0) return;
      const user: User = JSON.parse(JSON.stringify(this.selection.selected[0]));
      if (!user) {
        this._c_.notify.info('Kullanıcı Bulunamadı.');
      }

      this.editForm = user;
      const dialogRef = this.dialog.open(MatUserDialogComponent, {
        data: this.editForm,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == false) {
          this.editForm = new User();
          return;
        }
        this._c_.http
          .post<IResult<User[]>>(App.API + 'user/update', result)
          .subscribe({
            next: (response) => {
              if (!response.success) this._c_.notify.info(response.message);
              if (response.success)
                this._c_.notify.success('Kullanıcı Güncellendi.');

              this._c_.refreshRoute();
            },
          });
      });
    } catch (error: any) {
      this._c_.notify.error(error.toString());
    }
  }

  onDelete() {
    try {
      if (this.selection.selected.length == 0) return;
      const user: User = JSON.parse(JSON.stringify(this.selection.selected[0]));
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ds_mat_table.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.ds_mat_table.data);
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
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
