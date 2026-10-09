import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';
import { ResponseResult } from '../models/response-result';
import { environment } from '../../environments/environment';
import {
  CredentialsRequest,
  CredentialsResponse,
} from '../models/credentials.model';
import { SharedService } from './shared.service';
import { EnumCRUDPermission } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private credentials: CredentialsResponse = {};
  private userLogin: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private initials: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userDateHourAccess: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private _HttpClient: HttpClient = inject(HttpClient);
  private _Router: Router = inject(Router);
  private _SharedService: SharedService = inject(SharedService);

  // tslint:disable-next-line: max-line-length
  constructor() {
    this.userLogin = new BehaviorSubject<string>('');
    this.userName = new BehaviorSubject<string>('');
    this.initials = new BehaviorSubject<string>('');
    this.userDateHourAccess = new BehaviorSubject<string>('');

    if (!!localStorage.getItem('usuarioLogado')) {
      const data = JSON.parse(
        localStorage.getItem('usuarioLogado')!,
      ) as CredentialsResponse;
      const payload = this._SharedService.getTokenData(data.token!);
      const [ano, mes, dia] = payload.access_date.split('-');
      this.userLogin.next(payload.login);
      this.userName.next(payload.unique_name);
      this.initials.next(payload.initials);
      this.userDateHourAccess.next(
        `Logado no dia ${dia}/${mes}/${ano} as ${payload.access_time}`,
      );
    }
  }

  getUserLoginValue(): Observable<string> {
    return this.userLogin.asObservable();
  }

  setUserLoginValue(newValue: string): void {
    this.userLogin.next(newValue);
  }

  getUserNameValue(): Observable<string> {
    return this.userName.asObservable();
  }

  setUserNameValue(newValue: string): void {
    this.userName.next(newValue);
  }

  getInitialsValue(): Observable<string> {
    return this.initials.asObservable();
  }

  setInitialsValue(newValue: string): void {
    this.initials.next(newValue);
  }

  getDateHourValue(): Observable<string> {
    return this.userDateHourAccess.asObservable();
  }

  setDateHourValue(newValue: string): void {
    this.userDateHourAccess.next(newValue);
  }

  public Login(
    credencial: CredentialsRequest,
  ): Observable<ResponseResult<any>> {
    // tslint:disable-next-line: max-line-length
    return this._HttpClient
      .post<ResponseResult<any>>(environment.API + 'account/Login', {
        credentials: btoa(
          JSON.stringify({
            Login: credencial.login,
            Password: credencial.password,
          }),
        ),
        headers: {
          'Content-Type': 'text/plain',
        },
        withCredentials: false,
      })
      .pipe(map((response) => response));
  }

  public keepUserData(data: CredentialsResponse, IsProd: boolean) {
    if (IsProd) {
      const payload = this._SharedService.getTokenData(data.token!);
      this.credentials = new CredentialsResponse();
      this.credentials.roles = data.roles;
      this.credentials.token = data.token;
      localStorage.setItem('userLoggedData', JSON.stringify(this.credentials));
      const [ano, mes, dia] = payload.access_date.split('-');
      // tslint:disable-next-line: max-line-length
      this.setUserLoginValue(payload.login);
      this.setUserNameValue(payload.unique_name);
      this.setInitialsValue(payload.initials);
      this.setDateHourValue(
        `Logado no dia ${dia}/${mes}/${ano} as ${payload.access_time}`,
      );
    } else {
      this.credentials = new CredentialsResponse();
      this.credentials.roles = [];
      this.credentials.token = 'DJHSGDHJGHJDHSDHSD_DHJSGHJDGHJSD_245_fsdf';
      localStorage.setItem('userLoggedData', JSON.stringify(this.credentials));
      const [ano, mes, dia] = new Date().getDate().toString().split('-');
      // tslint:disable-next-line: max-line-length
      this.setUserLoginValue('Admin');
      this.setUserNameValue('Admin Dev');
      this.setInitialsValue('AD');
      this.setDateHourValue(
        `Logado no dia ${dia}/${mes}/${ano} as ${new Date().getUTCHours().toString()}`,
      );
    }
  }

  public isAuthenticated(): Observable<boolean> {
    const usuarioLogado = localStorage.getItem('userLoggedData');

    if (!usuarioLogado) {
      return of(false);
    }

    const payload = JSON.parse(usuarioLogado) as CredentialsResponse;

    const payloadToken = {
      token: payload.token,
    };

    return this._HttpClient
      .post<
        ResponseResult<any>
      >(environment.API + 'account/verifyToken', payloadToken)
      .pipe(
        take(1),
        map((response) => {
          return response.data.validToken;
        }),
        catchError((error) => {
          return of(false);
        }),
      );
  }

  public logout(): void {
    this.credentials = new CredentialsResponse();
    localStorage.clear();
  }

  public hasPermission(
    funcionalityId: number,
    crudPermission: EnumCRUDPermission,
  ): boolean {
    const data = JSON.parse(
      localStorage.getItem('userLoggedData')!,
    ) as CredentialsResponse;
    return (
      data.roles?.some(
        (x) =>
          x.funcionalityId == funcionalityId &&
          x.crudPermissions?.includes(crudPermission.toString()),
      ) ?? false
    );
  }
}
