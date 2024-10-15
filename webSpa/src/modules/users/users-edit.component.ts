import { inject } from "@angular/core";
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { CONSTANT_VARIABLES, CONSTANT_MESSAGES } from "../../core/constants/variables.constant";
import { hasErrorFormControl } from "../../core/functions/shared-string.functions";
import { DropDownListModel } from "../../core/models/dropdown-list.model";
import { SnackBarService } from "../../core/services/snackBar.service";

@Component({
    selector: 'app-users-edit',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTooltipModule, ReactiveFormsModule, RouterLink],
    templateUrl: './users-edit.component.html',
})

export class UsersEditComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private snackBarService: SnackBarService = inject(SnackBarService);

    public textPage: string = 'Edição de Usuário';
    public subTextPage: string = 'Por meio da edição, você será capaz de editar os dados do usuário.';
    public constant_variables = CONSTANT_VARIABLES;
    public form: FormGroup;

    public profileList: DropDownListModel[] = [
        { id: 1, description: 'Administrador', active: true },
        { id: 2, description: 'Colaborador', active: true },
        { id: 3, description: 'Cliente', active: true }
    ];

    constructor() {
        this.form = this.formBuilder.group({
            emailUsuario: ['', [Validators.required, Validators.email]],
            nomeUsuario: ['', [Validators.required]],
            perfilUsuario: ['', [Validators.required]],
        });
    }

    cleanForm(): void {
        this.form.reset();
    }

    hasErrorFormControl(formControl: AbstractControl): string {
        return hasErrorFormControl(formControl);
    }

    save() {
        this.snackBarService.sendSnackBarNotification(CONSTANT_MESSAGES.BTN_EDIT);
    }
}

