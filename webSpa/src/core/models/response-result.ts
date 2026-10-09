export interface ResponseResult<T> {
    message?: string;
    data?: T;
    statusCode?: number;
}

export interface ResponseResultArray<T> {
    message?: string;
    data?: T[];
    statusCode?: number;
}
