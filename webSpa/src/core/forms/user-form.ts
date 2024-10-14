import { FormGroup, FormControl, Validators } from "@angular/forms";

export const USER_FORM_ADD = new FormGroup({
    ID: new FormControl(['']),
    DESCRICAO: new FormControl(['', [Validators.required]]),
    LOCAL: new FormControl(['', Validators.required]),
    DATA: new FormControl(['', Validators.required]),
    HORA: new FormControl(['', Validators.required]),
    ALERTA: new FormControl(['']),
    STATUS: new FormControl(['', Validators.required])
});

export const USER_FORM_EDIT = new FormGroup({
    ID: new FormControl(['']),
    DESCRICAO: new FormControl(['', [Validators.required]]),
    LOCAL: new FormControl(['', Validators.required]),
    DATA: new FormControl(['', Validators.required]),
    HORA: new FormControl(['', Validators.required]),
    ALERTA: new FormControl(['']),
    STATUS: new FormControl(['', Validators.required])
});

export const USER_FORM_VIEW = new FormGroup({
    ID: new FormControl(['']),
    DESCRICAO: new FormControl(['', [Validators.required]]),
    LOCAL: new FormControl(['', Validators.required]),
    DATA: new FormControl(['', Validators.required]),
    HORA: new FormControl(['', Validators.required]),
    ALERTA: new FormControl(['']),
    STATUS: new FormControl(['', Validators.required])
});