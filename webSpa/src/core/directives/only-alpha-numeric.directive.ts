import {
    Directive,
    ElementRef,
    HostListener,
    Optional,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[onlyAlphaNumeric]',
})

export class OnlyAlphaNumericDirective {
    constructor(
        private _el: ElementRef,
        @Optional() private fieldControl: NgControl
    ) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = event.target.value;
        // this.fieldControl.control!.setValue(
        //   Converters.getOnlyAlphaNumeric(initalValue)
        // );
        if (initalValue !== this.fieldControl.value) {
            event.stopPropagation();
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        const initalValue = this.fieldControl.value;
        // this.fieldControl.control!.setValue(
        //   Converters.getOnlyAlphaNumeric(initalValue)
        // );

        event.preventDefault();
    }
}  