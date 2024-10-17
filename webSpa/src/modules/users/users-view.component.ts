import { inject } from "@angular/core";
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { DropDownListModel } from "../../core/models/dropdown-list.model";
import { DetailsRecordComponent } from "../../shared/components/details-record/details-record.component";

@Component({
    selector: 'app-users-view',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTooltipModule, ReactiveFormsModule, RouterLink, DetailsRecordComponent],
    templateUrl: './users-view.component.html',
})

export class UsersViewComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
    
    public textPage: string = 'Visualização do Usuário';
    public subTextPage: string = 'Por meio da visualização, você será capaz de analisar os dados do usuário, sem possibilidade de editar os dados.';
    public constant_variables = CONSTANT_VARIABLES;
    public form: FormGroup;

    public profileList: DropDownListModel[] = [
        { id: 1, description: 'Administrador', active: true },
        { id: 2, description: 'Colaborador', active: true },
        { id: 3, description: 'Cliente', active: true }
    ];

    constructor() {
        this.form = this.formBuilder.group({
            id: [],
            emailUsuario: [{ value: 'teste@gmail.com', disabled: true }, []],
            nomeUsuario: [{ value: 'Roberto XPTO', disabled: true }, []],
            perfilUsuario: [{ value: '1', disabled: true }, [],],
        });

        this._ActivatedRoute.params.subscribe(params => {
            if (!!params["id"]) {
                this.form.controls['id'].setValue(params["id"] as number ?? 0);
            }
        });
    }
}