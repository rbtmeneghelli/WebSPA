import { FormBuilder, FormGroup } from "@angular/forms";

export class GenericTableComponent {
    protected form!: FormGroup;
    protected formBuilder!: FormBuilder;

    constructor() {
        
    }
}

// this.formulario = this.formBuilder.group({
//     email: ['', [Validators.required, Validators.email]],
//   });