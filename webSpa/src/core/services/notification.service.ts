import { Musicas, MusicasFilterData } from './../models/musicas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { ResponseResult } from '../models/response-result';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notify } from '../models/notify';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable()
export class NotificationService extends BaseService<Notify> {

    public hubConnection: HubConnection;
    public notifications?: BehaviorSubject<Notify[]> = new BehaviorSubject<Notify[]>([]);

    constructor(http: HttpClient) {
        super(http, `${environment.API}notify`);
    }

    getNotifications(): Observable<Notify[]> {
        return this.notifications.asObservable();
    }

    setNotifications(newValue): void {
        this.notifications.next(newValue);
    }

    getAllNotifications(notifications?: number[]): Observable<ResponseResult<any>> {
        // tslint:disable-next-line: max-line-length
        return this.http.get<ResponseResult<any>>(`${`${environment.API}notify`}/getAllNotifications`, { headers: this.getOptions() });
    }

    downloadArquivo(id: number): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.get<any>(`${`${environment.API}notify/downloadfile/${id}`}`, { headers: this.getOptions(), responseType: 'blob' as 'json' });
    }

    readNotification(id: number): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.get<any>(`${`${environment.API}notify/readNotification/${id}`}`, { headers: this.getOptions(), responseType: 'blob' as 'json' });
    }

    public startConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.SOCKET}streaminghub`)
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }
}




