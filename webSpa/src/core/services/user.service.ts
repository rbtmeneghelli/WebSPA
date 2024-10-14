import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../models/response-result';
import { GenericService } from './generic.service';

@Injectable()
export class UsuarioService extends GenericService<any, any, any> {

    constructor(http: HttpClient) {
        super(http, `${environment.API}/users`);
    }

    changePassword(usuario?: any) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<ResponseResult<boolean>>(`${`${environment.API}`}/changePassword`, usuario, { headers: this.getOptions() });
    }

    resetPassword(request?: any) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<ResponseResult<boolean>>(`${`${environment.API}`}/resetPassword`, request, { headers: this.getOptions() });
    }
}
