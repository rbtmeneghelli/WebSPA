import { SnackBarService } from './../../core/services/snackBar.service';
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
import { CONSTANT_MESSAGES, CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DropDownListModel } from "../../core/models/dropdown-list.model";
import { hasErrorFormControl } from "../../core/functions/shared-string.functions";

@Component({
    selector: 'app-users-add',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTooltipModule, ReactiveFormsModule, RouterLink],
    templateUrl: './users-add.component.html',
})

export class UsersAddComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private snackBarService: SnackBarService = inject(SnackBarService);

    public textPage: string = 'Cadastro de Usuário';
    public subTextPage: string = 'Por meio do cadastro, você será capaz de adicionar novos usuários.';
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
        this.snackBarService.sendSnackBarNotification(CONSTANT_MESSAGES.BTN_NEW);
    }
}