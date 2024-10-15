import { HttpHeaders } from "@angular/common/http";
import { DropDownListModel } from "../models/dropdown-list.model";
import { convertStringToBase64, makeReplaceLeftBracket, makeReplaceRightBracket, makeReplaceSpecialCharactersInRequest, makeReplaceSpecialCharactersInResponse, replaceAll } from "./shared-string.functions";
import { isStringHasNonAsciiCharacters } from "./shared-boolean.functions";

export const getSpecialCharactersFromString = (text: string): any => {
    var spCharactersStringList: any[] = [];
    var exceptionCharactersList: any[] = ['/', ':', '-', '+', '*', ',', '.']
    var specialCharactersFromText = text.replace(/[\w\s\u00C0-\u017F]/gi, '').trim();
    for (var i = 0; i <= specialCharactersFromText.length; i++) {
        var character = specialCharactersFromText.substr(i, 1);
        if (exceptionCharactersList.includes(character) === false && !!character) {
            spCharactersStringList.push(character);
        }
    }
    return spCharactersStringList;
}

export const convertDataStringToBase64 = (obj: { [x: string]: any; }): any => {
    try {

        //var spCharactersStringList: any = ['%', "'", '#', '“', '”', '"', '`', '(', ')'];
        var spCharacters: any = ['(', ')'];

        Object.keys(obj).forEach(function (chave) {

            var prop = obj[chave];

            if (typeof prop === 'object' && !!prop) {
                convertDataStringToBase64(prop);
            }

            else {

                if (typeof prop === 'string' && !!prop) {

                    if (isStringHasNonAsciiCharacters(prop)) {

                        var spCharactersStringList = getSpecialCharactersFromString(prop);

                        spCharactersStringList.forEach((spCharacter: string) => {

                            if (prop?.indexOf(spCharacter) !== -1 && spCharacters.includes(spCharacter) === false) {
                                prop = makeReplaceSpecialCharactersInRequest(prop, spCharacter);
                            }

                            else if (prop?.indexOf(spCharacter) !== -1 && spCharacters[0] === spCharacter) {
                                prop = makeReplaceLeftBracket(prop, spCharacter);
                            }

                            else if (prop?.indexOf(spCharacter) !== -1 && spCharacters[1] === spCharacter) {
                                prop = makeReplaceRightBracket(prop, spCharacter);
                            }

                            obj[chave] = prop;
                        });
                    }
                }
            }
        });
        return obj;
    }

    catch (e) {
        alert(e);
    }
}

export const convertDataBase64ToString = (obj: any): any => {
    try {

        var spCharactersStringList: any = ['%', "'", '#', '“', '”', '"', '`', '(', ')'];

        Object.keys(obj).forEach(function (chave) {

            var prop = obj[chave];
            if (typeof prop === 'object') {
                convertDataBase64ToString(prop);
            }

            else {
                if (typeof prop === 'string') {
                    spCharactersStringList.forEach((spCharacter: string) => {
                        if (prop?.indexOf(convertStringToBase64(spCharacter)) !== -1) {
                            prop = makeReplaceSpecialCharactersInResponse(prop, convertStringToBase64(spCharacter));
                        }
                        obj[chave] = prop;
                    });
                }
            }
        });
        return obj;
    }
    catch (e) {
        alert(e);
    }
}

export const _filterDropDownList = (list: DropDownListModel[], value: string): DropDownListModel[] => {
    if (!!list && list?.length > 0) {
        if (value?.length > 0 && !!value) {
            list = list.filter(option => option.description?.toLowerCase()?.includes(value?.toLowerCase()));
        }
        return orderByDropDownList(list);
    } else {
        return [];
    }
}

export const orderByDropDownList = (lista: DropDownListModel[]): DropDownListModel[] => {
    // tslint:disable-next-line: only-arrow-functions
    return lista.sort(function (a, b) {
        if (a.description > b.description) {
            return 1;
        }
        if (a.description < b.description) {
            return -1;
        }
        return 0;
    });
}

export const createDateTimeData = (date: string, time: string): Date | null => {
    if (date?.length >= 8 && time?.length >= 4) {
        if (date?.includes('/')) {
            date = replaceAll(date, '/', '');
        }
        if (time?.includes(':')) {
            time = replaceAll(time, ':', '');
        }
        // tslint:disable-next-line: max-line-length
        return new Date(Date.UTC(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)), Number(time.substr(0, 2)), Number(time.substr(2, 2)), 0, 0));
    }

    return null;
}

export const createDate = (date: string): Date | null => {
    if (date?.length >= 8 && !date?.includes('/')) {
        return new Date(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)));
    } else if (!!date) {
        date = replaceAll(date, '/', '');
        return new Date(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)));
    }
    return null;
}

export const getHttpHeaders = (): HttpHeaders => {
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

export const getOptionsHeader = (): HttpHeaders => {
    const headers = new HttpHeaders()
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*');
    return headers;
}