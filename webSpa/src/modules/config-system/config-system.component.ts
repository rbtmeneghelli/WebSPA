import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { DropDownListModel } from "../../core/models/dropdown-list.model";

@Component({
    selector: 'app-config-system',
    standalone: true,
    imports: [CommonModule,MatListModule, MatIconModule, MatButtonModule],
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

    selectAll() {
        if (this.isAllChecked) {
            this.listaLog.map(item => {
                item.active = false
            });
            this.isAllChecked = false;
        } else {
            this.listaLog.map(item => {
                item.active = true
            });
            this.isAllChecked = true;
        }
    }
}