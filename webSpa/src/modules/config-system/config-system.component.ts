import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { DropDownListModel } from "../../core/models/dropdown-list.model";
import { ReactiveFormsModule } from "@angular/forms";
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: 'app-config-system',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule],
    templateUrl: './config-system.component.html',
})

export class ConfigSystemComponent {
    public isAllChecked: boolean = false;
    public listaLog: DropDownListModel[] = [
        { id: 1, description: 'Gravar log ao acessar o sistema', active: false },
        { id: 2, description: 'Gravar log ao deslogar do sistema', active: false },
        { id: 3, description: 'Gravar log ao cadastrar um novo registro', active: false },
        { id: 4, description: 'Gravar log ao editar um registro', active: false },
        { id: 5, description: 'Gravar log ao excluir um registro', active: false }];

    public textPage: string = 'Configuração do Sistema';
    public subTextPage: string = 'Por meio da consulta, você pode consultar diferentes usuários, ou realizar uma busca mais aprofundada, preenchendo 1 ou mais campos dos filtros abaixo.';
    public constant_variables = CONSTANT_VARIABLES;

    cleanForm(): void {
        this.isAllChecked = false;
        this.listaLog.map(x => {
            x.active = false
        });
    }

    selectAll() {
        if (this.isAllChecked) {
            this.listaLog.map(x => {
                x.active = false
            });
            this.isAllChecked = false;
        } else {
            this.listaLog.map(x => {
                x.active = true
            });
            this.isAllChecked = true;
        }
    }

    changeType(opItem: DropDownListModel): void {
        const opLog = this.listaLog.find(item => item.id === opItem.id) ?? null;
        if (opLog) {
            opLog.active = !opItem.active;
        }
    }

    enableButton(): boolean {
        const listValidation = this.listaLog.some(x => x.active === true);
        return listValidation ? false : true;
    }
}