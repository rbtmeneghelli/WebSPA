import { SnackBarService } from './snackBar.service';
import { inject, Injectable } from "@angular/core";
import { map, catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { SharedService } from "./shared.service";
import { UploadFileModel } from "../models/upload-file.model";
import { EnumActionMessage, EnumTypeMessage } from '../enums/enums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHttpHeaders } from '../functions/shared-methods.function';

@Injectable({
    providedIn: 'root'
})

export class FileService {
    private API: string = 'arquivo';
    private readonly _HttpClient: HttpClient = inject(HttpClient);
    private readonly _SharedService: SharedService = inject(SharedService);
    private readonly _SnackBarService: SnackBarService = inject(SnackBarService);

    public uploadFile(arquivo: UploadFileModel, file: File) {
        const inputMultiPart = new FormData();
        inputMultiPart.append('file', file);
        inputMultiPart.append('json', JSON.stringify(arquivo));
        return this._HttpClient.post(`${environment.API}/${this.API}`, inputMultiPart, { headers: getHttpHeaders() }).pipe(
            map(response => response),
            catchError(e => {
                let msg = '';
                if (e.message) {
                    msg = e.message;
                }
                this._SnackBarService.sendSnackBarNotification('Erro para efetuar o upload do arquivo', EnumTypeMessage.Personalized, EnumActionMessage.Error);
                return throwError(e);
            })
        );
    }

    public downloadFile(objFilter: any, url: string, formatFile: string) {
        const fullUri = `${environment.API}/export2Excel`;
        const preparedObject = JSON.stringify(objFilter);
        return this._HttpClient
            .post(fullUri, preparedObject, {
                observe: 'response',
                responseType: 'blob',
                headers: getHttpHeaders()
            })
            .pipe(
                map(response => {
                    return {
                        data: response.body,
                        filename: `Modelo_${url}.${formatFile}`
                    };
                })
            );
    }

    public optionalDownloadFile(url: string): any {
        let data = localStorage.getItem('userLoggedData')?.replace('"', '')?.trim() ?? '';
        let headers = new HttpHeaders();
        headers = headers
            .set(
                'Authorization',
                'Bearer ' +
                data
            )
            .append('Accept', 'application/pdf')
            .append('Access-Control-Allow-Origin', '*');
        return this._HttpClient.get(url, { headers, responseType: 'blob' as 'json' });
    }
}