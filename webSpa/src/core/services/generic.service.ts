import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseResultArray, ResponseResult } from '../models/response-result';
import { catchError, first, map } from 'rxjs/operators';

export abstract class GenericService<TRequestFilterData, TEntityResponse> {

    protected _actionUrl: string;

    constructor(protected http: HttpClient, protected actionUrl: string) {
        this._actionUrl = actionUrl;
    }

    getAllPaginate(requestFilterData: TRequestFilterData) {
        return this.http.post<ResponseResult<any>>(`${this.actionUrl}/getAllPaginate`, requestFilterData, { headers: this.getOptions() }).pipe(
            first()
        );
    }

    getAll(): Observable<ResponseResultArray<TEntityResponse>> {
        return this.http.get<ResponseResultArray<TEntityResponse>>(this.actionUrl, { headers: this.getOptions() });
    }

    getById(id: number): Observable<ResponseResult<TEntityResponse>> {
        return this.http.get<ResponseResult<TEntityResponse>>(`${this.actionUrl}/${id}`, { headers: this.getOptions() });
    }

    create(request: TEntityResponse): Observable<TEntityResponse> {
        return this.http.post<TEntityResponse>(this.actionUrl, request, { headers: this.getOptions() });
    }

    update(id: number, request: TEntityResponse): Observable<TEntityResponse> {
        return this.http.put<TEntityResponse>(`${this.actionUrl}/${id}`, request, { headers: this.getOptions() });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.actionUrl}/${id}`, { headers: this.getOptions() });
    }

    updateStatus(id?: number): Observable<TEntityResponse> {
        return this.http.put<TEntityResponse>(`${this.actionUrl}/updateStatusById/${id}`, '', { headers: this.getOptions() });
    }

    exportExcel(sheet?: string, data?: string[], dataFilters?: string[]): Observable<any> {
        const objectJSON = { columns: data, filters: dataFilters };
        const columns = { columns: data };
        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${this.actionUrl}/sheet/${sheet}/download`, columns, { headers: this.getOptions(), responseType: 'blob' as 'json' });
    }

    getList(url: string): Observable<any> {
        return this.http.get<any>(`${this.actionUrl}/${url}`, { headers: this.getOptions() });
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

    private getIpAddress(): Observable<string> {
        return this.http.get('http://api.ipify.org/?format=json').pipe(map((res: any) => { return res.ip }), catchError((error: any) => { return 'Erro ao capturar seu IP' }));
    }
}