import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseResult } from '../models/response-result';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notify } from '../models/notify.model';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationService  {

    private http: HttpClient = inject(HttpClient);
    private hubConnection: HubConnection = inject(HubConnection);
    public notifications: BehaviorSubject<Notify[]> = new BehaviorSubject<Notify[]>([]);

    getNotifications(): Observable<Notify[]> {
        return this.notifications.asObservable();
    }

    setNotifications(newValue: any): void {
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

    private getOptions(): HttpHeaders {
        let httpOptions: HttpHeaders = new HttpHeaders();
        httpOptions = httpOptions.set('Content-Type', 'application/json');
        httpOptions = httpOptions.set('Access-Control-Allow-Origin', '*');
        httpOptions = httpOptions.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // tslint:disable-next-line: max-line-length
        httpOptions = httpOptions.set('Access-Control-Allow-Headers', '*');
        if (!!localStorage.getItem('userLoggedData')) {
            const data: any = JSON.parse(localStorage.getItem('userLoggedData') ?? '');
            httpOptions = httpOptions.set('Authorization', `Bearer ${data.token}`);
        }
        return httpOptions;
    }
}




