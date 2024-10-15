import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseResult } from '../models/response-result';
import { BehaviorSubject, Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { getHttpHeaders } from '../functions/shared-methods.function';
import { NotifyEntity } from '../models/notify.model';

@Injectable()
export class NotificationService {

    private readonly _HttpClient: HttpClient = inject(HttpClient);
    private _HubConnection: HubConnection = inject(HubConnection);
    public notifications: BehaviorSubject<NotifyEntity[]> = new BehaviorSubject<NotifyEntity[]>([]);

    public getNotifications(): Observable<NotifyEntity[]> {
        return this.notifications.asObservable();
    }

    public setNotifications(newValue: any): void {
        this.notifications.next(newValue);
    }

    public getAllNotifications(notifications?: number[]): Observable<ResponseResult<any>> {
        // tslint:disable-next-line: max-line-length
        return this._HttpClient.get<ResponseResult<any>>(`${`${environment.API}notify`}/getAllNotifications`, { headers: getHttpHeaders() });
    }

    public downloadArquivo(id: number): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this._HttpClient.get<any>(`${`${environment.API}notify/downloadfile/${id}`}`, { headers: getHttpHeaders(), responseType: 'blob' as 'json' });
    }

    public readNotification(id: number): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this._HttpClient.get<any>(`${`${environment.API}notify/readNotification/${id}`}`, { headers: getHttpHeaders(), responseType: 'blob' as 'json' });
    }

    public startConnection = () => {
        this._HubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.SOCKET}streaminghub`)
            .build();
        this._HubConnection
            .start()
            .then(() => {})
            .catch(err => {})
    }
}




