import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DropDownListModel } from "../../core/models/dropdown-list.model";
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OnlyNumberDirective } from "../../core/directives/only-number.directive";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SnackBarService } from "../../core/services/snackBar.service";
import { hasErrorFormControl } from "../../core/functions/shared-string.functions";

@Component({
    selector: 'app-config-mail',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatFormFieldModule, MatListModule, MatInputModule, MatButtonModule, MatTooltipModule,
        OnlyNumberDirective, ReactiveFormsModule
    ],
    templateUrl: './config-mail.component.html',
})

export class ConfigMailComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private snackBarService: SnackBarService = inject(SnackBarService);

    public hidePassword: boolean = true;
    public isAllChecked: boolean = false;
    public listaLog: DropDownListModel[] = [
        { id: 1, description: 'Gravar log ao acessar o sistema', active: false },
        { id: 2, description: 'Gravar log ao deslogar do sistema', active: false },
        { id: 3, description: 'Gravar log ao cadastrar um novo registro', active: false },
        { id: 4, description: 'Gravar log ao editar um registro', active: false },
        { id: 5, description: 'Gravar log ao excluir um registro', active: false }];

    public listaEmail: any[] = [
        { id: 1, description: 'Habilitar Ssl', formName: 'enableSsl', active: false },
        { id: 2, description: 'Utilizar Url de Dev', formName: 'isDev', active: false }
    ];

    public textPage: string = 'Configuração de Email';
    public subTextPage: string = 'Por meio da consulta, você pode consultar diferentes usuários, ou realizar uma busca mais aprofundada, preenchendo 1 ou mais campos dos filtros abaixo.';
    public constant_variables = CONSTANT_VARIABLES;
    public form: FormGroup;

    constructor() {
        this.form = this.formBuilder.group({
            host: ['', [Validators.required]],
            smtp: ['', [Validators.required]],
            portaPrincipal: ['', [Validators.required]],
            portaSecundaria: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]],
            enableSsl: [false, []],
            isDev: [false, []],
        });
    }

    cleanForm(): void {
        this.form.reset();
        this.isAllChecked = false;
        this.listaEmail.map(x => {
            x.active = false
            this.form.controls[x.formName].setValue(false);
        });
    }

    selectAll() {
        if (this.isAllChecked) {
            this.listaEmail.map(x => {
                x.active = false
                this.form.controls[x.formName].setValue(false);
            });
            this.isAllChecked = false;
        } else {
            this.listaEmail.map(x => {
                x.active = true
                this.form.controls[x.formName].setValue(true);
            });
            this.isAllChecked = true;
        }
    }

    changeType(opItem: DropDownListModel): void {
        const opEmail = this.listaEmail.find(item => item.id === opItem.id) ?? null;
        if (opEmail) {
            opEmail.active = !opItem.active;
            this.form.controls[opEmail.formName].setValue(opEmail.active);
        }
    }

    enableButton(): boolean {
        const formValidation = this.form.valid;
        const listValidation = this.listaEmail.some(x => x.active === true);
        return formValidation && listValidation ? false : true;
    }

    hasErrorFormControl(formControl: AbstractControl): string {
        return hasErrorFormControl(formControl);
    }
}