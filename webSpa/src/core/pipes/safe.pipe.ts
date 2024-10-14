import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'urlSafe'
})

export class UrlSafePipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) { }

    transform(url: string) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}