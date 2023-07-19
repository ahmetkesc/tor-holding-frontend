import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/classes/users';

@Component({
  selector: 'mat-users-dialog',
  template: `
    <h2 mat-dialog-title>Kullanıcı İşlemleri</h2>
    <mat-dialog-content class="mat-typography">
      <form class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Adı
            </label>
            <input
              [(ngModel)]="editForm.adi"
              name="adi"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ahmet"
            />
            <div *ngIf="editForm.adi == ''" class="text-red-500 text-xs italic">
              Lütfen ad giriniz.
            </div>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Soyadı
            </label>
            <input
              [(ngModel)]="editForm.soyadi"
              name="soyadi"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Kesici"
            />
            <div
              *ngIf="editForm.soyadi == ''"
              class="text-red-500 text-xs italic"
            >
              Lütfen soyadı giriniz.
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Adres
            </label>
            <input
              [(ngModel)]="editForm.adres"
              name="adres"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Açık Adres Bilgisi"
            />
            <p class="text-gray-600 text-xs italic">
              Lütfen açık adres bilgisi giriniz.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Cep
            </label>
            <input
              [(ngModel)]="editForm.cep"
              name="cep"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="(5##) ### ## ##"
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              E-Posta
            </label>
            <div class="relative">
              <input
                [(ngModel)]="editForm.eposta"
                name="eposta"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="ornek@ornek.com"
              />
              <div
                *ngIf="editForm.eposta == ''"
                class="text-red-500 text-xs italic"
              >
                Lütfen E-Posta adresi giriniz.
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              Şifre
            </label>
            <input
              [(ngModel)]="editForm.sifre"
              name="sifre"
              type="password"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="********"
            />
            <div
              *ngIf="editForm.sifre == ''"
              class="text-red-500 text-xs italic"
            >
              Lütfen şifre giriniz.
            </div>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="editForm" cdkFocusInitial>
        Kaydet
      </button>
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>
        Vazgeç
      </button>
    </mat-dialog-actions>
  `,
})
export class MatUserDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MatUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editForm: User
  ) {}

  ngOnInit() {}
}
