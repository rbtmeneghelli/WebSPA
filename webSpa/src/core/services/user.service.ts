import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../models/response-result';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { getHttpHeaders } from '../functions/shared-methods.function';

@Injectable()
export class UsuarioService extends GenericService<any, any> {

    constructor(protected readonly httpClient: HttpClient) {
        super(httpClient, `${environment.API}/users`);
    }

    public changePassword(usuario?: any) {
        // tslint:disable-next-line: max-line-length
        return this._HttpClient.post<ResponseResult<boolean>>(`${`${environment.API}`}/changePassword`, usuario, { headers: getHttpHeaders() });
    }

    public resetPassword(request?: any) {
        // tslint:disable-next-line: max-line-length
        return this._HttpClient.post<ResponseResult<boolean>>(`${`${environment.API}`}/resetPassword`, request, { headers: getHttpHeaders() });
    }
}
