import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LayoutService } from './layout.service';
import { IResult } from 'src/app/shared/interfaces/result.interface';
import { App } from '../constants/app';
import { ISession } from 'src/app/shared/interfaces/session.interface';
import { LoginParameter } from 'src/app/shared/classes/login-parameter';
import { Observable } from 'rxjs';
import { AccessToken } from 'src/app/shared/classes/access-token';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(
    private _r_: Router,
    private _n_: NotifyService,
    private _h_: HttpClient,
    private _l_: LayoutService
  ) {}

  get notify() {
    return this._n_;
  }

  get router() {
    return this._r_;
  }

  get http() {
    return this._h_;
  }

  get layout() {
    return this._l_;
  }

  refreshRoute = () => {
    let url = this.router.url;
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };

  setLocalStorage(key: string, value: string) {
    localStorage.removeItem(key);
    let encrypted = this.cryptoEncrypt(value);
    localStorage.setItem(key, encrypted);
  }

  getLocalStorage<T>(key: string) {
    let encrypted = localStorage.getItem(key);

    if (encrypted == null) return null;
    {
      let decrypted = this.cryptoDecrypt(encrypted);
      return JSON.parse(decrypted) as T;
    }
  }

  getSession = <T>() => this.getLocalStorage<ISession<T>>(App._T_SESSION);

  async encryptedValue(str: string): Promise<string> {
    const numArray = new Uint8Array(16);
    const keyData = new TextEncoder().encode(App._GLOBAL_AES_KEY_);
    const aes = window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-CBC', length: 256 },
      false,
      ['encrypt']
    );
    const iv = new Uint8Array(numArray);
    const data = new TextEncoder().encode(str);
    const encryptedData = window.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      await aes,
      data
    );
    return btoa(
      String.fromCharCode.apply(
        null,
        <number[]>(<unknown>new Uint8Array(await encryptedData))
      )
    );
  }

  async decryptedValue(str: string): Promise<string> {
    const encryptedData = Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
    const numArray = new Uint8Array(16);
    const keyData = new TextEncoder().encode(App._GLOBAL_AES_KEY_);
    const aesAlgorithm = { name: 'AES-CBC', length: 256 };
    const aesKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      aesAlgorithm,
      false,
      ['encrypt', 'decrypt']
    );
    const iv = new Uint8Array(numArray);
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      aesKey,
      encryptedData
    );
    return new TextDecoder().decode(decryptedData);
  }

  cryptoDecrypt(value: string) {
    var CryptoJS = require('crypto-js');
    if (value) {
      const result = CryptoJS.AES.decrypt(value, App._GLOBAL_AES_KEY_).toString(
        CryptoJS.enc.Utf8
      );
      return result;
    }
    return '';
  }
  cryptoEncrypt(value: string) {
    var crypto = require('crypto-js');
    if (value) {
      const result = crypto.AES.encrypt(value, App._GLOBAL_AES_KEY_).toString();
      return result;
    }
    return '';
  }

  login(parameter: LoginParameter): Observable<IResult<AccessToken>> {
    return this.http.post<IResult<AccessToken>>(
      `${App.API}auth/login`,
      parameter
    );
  }

  logout(): void {
    this.notify.show('Çıkış yapılıyor.');
    setTimeout(() => {
      this.notify.hide();
      localStorage.removeItem(App._T_SESSION);
      this.router.navigate(['/login']);
    }, 1000);
  }

  refreshToken(): Observable<IResult<AccessToken>> {
    const _ = this.getSession<AccessToken>();

    return this.http.post<IResult<AccessToken>>(`${App.API}auth/refresh`, {
      token: _?.data.refreshToken,
      input: _?.data.input,
    });
  }

  isAuth() {
    let result = this.getSession<AccessToken>();
    if (result == null || result == undefined) return false;
    if (result.data == null || result.data == undefined) return false;

    return true;
  }
}
