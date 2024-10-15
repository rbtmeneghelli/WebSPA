import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseResultArray, ResponseResult } from '../models/response-result';
import { first } from 'rxjs/operators';
import { getHttpHeaders } from '../functions/shared-methods.function';

export abstract class GenericService<TRequestFilterData, TEntityResponse> {

    protected _actionUrl: string;

    constructor(protected readonly _HttpClient: HttpClient, protected actionUrl: string) {
        this._actionUrl = actionUrl;
    }

    public getAllPaginate(requestFilterData: TRequestFilterData) {
        return this._HttpClient.post<ResponseResult<any>>(`${this.actionUrl}/getAllPaginate`, requestFilterData, { headers: getHttpHeaders() }).pipe(
            first()
        );
    }

    public getAll(): Observable<ResponseResultArray<TEntityResponse>> {
        return this._HttpClient.get<ResponseResultArray<TEntityResponse>>(this.actionUrl, { headers: getHttpHeaders() });
    }

    public getById(id: number): Observable<ResponseResult<TEntityResponse>> {
        return this._HttpClient.get<ResponseResult<TEntityResponse>>(`${this.actionUrl}/${id}`, { headers: getHttpHeaders() });
    }

    public create(request: TEntityResponse): Observable<TEntityResponse> {
        return this._HttpClient.post<TEntityResponse>(this.actionUrl, request, { headers: getHttpHeaders() });
    }

    public update(id: number, request: TEntityResponse): Observable<TEntityResponse> {
        return this._HttpClient.put<TEntityResponse>(`${this.actionUrl}/${id}`, request, { headers: getHttpHeaders() });
    }

    public delete(id: number): Observable<any> {
        return this._HttpClient.delete<any>(`${this.actionUrl}/${id}`, { headers: getHttpHeaders() });
    }

    public updateStatus(id?: number): Observable<TEntityResponse> {
        return this._HttpClient.put<TEntityResponse>(`${this.actionUrl}/updateStatusById/${id}`, '', { headers: getHttpHeaders() });
    }

    public getList(url: string): Observable<any> {
        return this._HttpClient.get<any>(`${this.actionUrl}/${url}`, { headers: getHttpHeaders() });
    }
}