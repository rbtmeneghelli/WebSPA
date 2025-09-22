import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseResult } from '../models/response-result';
import { environment } from '../../environments/environment';
import { getHttpHeaders } from '../functions/shared-methods.function';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    private credentials!: CredentialsModel;
    private _HttpClient: HttpClient = inject(HttpClient);
    private _Router: Router = inject(Router);

    public get credencial(): CredentialsModel {
        if (this.credentials != null) {
            return this.credentials;

        } else if (this.credentials == null && localStorage.getItem('userLoggedData') != null) {
            this.setCredentials();
            return this.credentials;
        }
        return new CredentialsModel();
    }

    public login(credentials: CredentialsModel): Observable<ResponseResult<string>> {
        // tslint:disable-next-line: max-line-length
        return this._HttpClient.post<ResponseResult<string>>(environment.API + 'Conta/Login', { data: this.getCredencial(credentials.email, credentials.password) }, { headers: getHttpHeaders() })
            .pipe(map(response => response));
    }


    public keepUserData(credencial: CredentialsModel) {
        const payload = this.getTokenData(credencial.token);
        this.credentials = new CredentialsModel();
        this.credentials.name = 'Roberto Meneghelli';
        this.credentials.email = 'admin@gmail.com';
        this.credentials.password = '***********';
        this.credentials.profile = 'Administrador';
        this.credentials.roles = [];
        this.credentials.token = 'DJHSGDHJGHJDHSDHSD_DHJSGHJDGHJSD_245_fsdf';
        localStorage.setItem('userLoggedData', JSON.stringify(this.credentials));
    }

    public isAuthenticated(): boolean {
        //const payload = this.getTokenData(this.credencial.token);
        // return !!payload;
        const data = localStorage.getItem('userLoggedData');
        if (!!data) {
            const result: CredentialsModel = JSON.parse(data) as CredentialsModel;
            return !!result.token ? true : false;
        }
        return false;
    }

    public logout(): void {
        this.credentials = new CredentialsModel();
        localStorage.clear();
        this._Router.navigate(['/login']);
    }

    public hasRole(role: string): boolean {
        if (this.credentials.roles && this.credentials.roles.includes(role)) {
            return true;
        }
        return false;
    }

    public getUserName(): string {
        this.setCredentials();
        if (!!this.credentials) {
            return this.credentials.name;
        }
        return '';
    }

    public getUserEmail(): string {
        this.setCredentials();
        if (!!this.credentials) {
            return this.credentials.email;
        }
        return '';
    }

    public isTokenExpired(): boolean {
        const payload = this.getTokenData(this.credentials.token);
        const now = new Date().getTime() / 1000;
        if (payload.exp < now) {
            return true;
        }
        return false;
    }

    private setCredentials() {
        if(!!localStorage.getItem('userLoggedData')){
            this.credentials = new CredentialsModel();
            this.credentials.name = 'Roberto Meneghelli';
            this.credentials.email = 'admin@gmail.com';
            this.credentials.password = '***********';
            this.credentials.profile = 'Administrador';
            this.credentials.roles = [];
            this.credentials.token = 'DJHSGDHJGHJDHSDHSD_DHJSGHJDGHJSD_245_fsdf';
            // const payload = this.getTokenData(data.token);
            // this.credentials = {
            //     email: payload.unique_name,
            //     password: '*********',
            //     profile: payload.profile,
            //     roles: payload.role,
            //     token: data.token
            // };
        }
    }

    private getCredencial(login: string, senha: string): string {
        return btoa(JSON.stringify({ Login: login, Senha: senha }));
    }

    private b64DecodeUnicode(data: string) {
        // tslint:disable-next-line: only-arrow-functions
        return decodeURIComponent(atob(data).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    private getTokenData(accessToken: string): any {
        if (!!accessToken) {
            return JSON.parse(this.b64DecodeUnicode(accessToken.split('.')[1]));
        }
        return null;
    }
}
