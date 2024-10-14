import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[onlyNumberPtbr]'
})

export class OnlyNumberPtBrDirective {

    constructor(private el: ElementRef) { }

    // tslint:disable-next-line: typedef
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        // \^[0-9]*\,?[0-9]{0,2}
        this.el.nativeElement.value = initalValue.replace(/[^0-9\,]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}