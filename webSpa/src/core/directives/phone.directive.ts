import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phone]',
})

export class PhoneDirective {
  constructor(
    private _el: ElementRef,
    @Optional() private fieldControl: NgControl
  ) {}

  @HostListener('change', ['$event']) onChange(e: any) {
    //const initalValue = Converters.getOnlyNumbers(this._el.nativeElement.value);
    //this.fieldControl.control!.setValue(PhoneUtils.applyMask(initalValue));
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const initalValue = this.fieldControl.value;
    //this.fieldControl.control!.setValue(PhoneUtils.applyMask(initalValue));
    event.preventDefault();
  }
}
