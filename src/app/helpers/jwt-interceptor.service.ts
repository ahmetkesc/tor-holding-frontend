import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { CommonService } from './services/common.service';
import { AccessToken } from '../shared/classes/access-token';
import { App } from './constants/app';
import { ISession } from '../shared/interfaces/session.interface';
import { IResult } from '../shared/interfaces/result.interface';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private _c_: CommonService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const _ = this._c_.getSession<AccessToken>();
    if (req.url.includes('login')) return next.handle(req);
    if (_?.data.token) {
      req = this.addTokenToRequest(req, _.data.token);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status == 401) {
          return this.handleUnauthorizedError(req, next);
        } else {
          switch (error.status) {
            case 0:
              this._c_.notify.error('Sunucuya ulaşılamadı!');
              break;
            case 400:
              if (error.error && (error.error as IResult<any>)) {
                let data: IResult<any> = error.error;
                if (!data.success) {
                  this._c_.notify.error(data.message);
                }
              }
              break;
            case 401:
              // this.logout(true);
              break;
            case 404:
              this._c_.notify.info('İstek yolu bulunamadı!');
              break;
          }
          this._c_.notify.hide();
          return throwError(error);
        }
      })
    );
  }

  private addTokenToRequest(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handleUnauthorizedError(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.refreshTokenSubject.next(null);

      return this._c_.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(response.data.token);

          this._c_.setLocalStorage(
            App._T_SESSION,
            JSON.stringify({
              data: response.data,
              logged: true,
            } as ISession<AccessToken>)
          );

          return next.handle(this.addTokenToRequest(req, response.data.token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this._c_.notify.hide();
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(2),
        switchMap((token) => {
          return next.handle(this.addTokenToRequest(req, token));
        })
      );
    }
  }
}
