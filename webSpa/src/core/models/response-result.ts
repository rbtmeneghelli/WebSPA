export interface ResponseResult<T> {
    message?: string;
    result?: T;
    statusCode?: number;
}

export interface ResponseResultArray<T> {
    message?: string;
    result?: T[];
    statusCode?: number;
}
