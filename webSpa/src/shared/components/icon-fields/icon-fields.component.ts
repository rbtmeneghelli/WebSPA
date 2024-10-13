import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DropDownList } from "../../../core/models/dropdown-list.model";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'app-icon-fields',
    standalone: true,
    imports: [MatIconModule, MatCardModule, MatListModule, CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './icon-fields.component.html',
})

export class IconFieldsComponent {
    public isAllChecked: boolean = false;
    public listaLog: DropDownList[] = [
        { id: 1, description: 'Gravar log ao acessar o sistema', active: false },
        { id: 2, description: 'Gravar log ao deslogar do sistema', active: false },
        { id: 3, description: 'Gravar log ao cadastrar um novo registro', active: false },
        { id: 4, description: 'Gravar log ao editar um registro', active: false },
        { id: 5, description: 'Gravar log ao excluir um registro', active: false }];

    public listaEmail: DropDownList[] = [
        { id: 1, description: 'Habilitar Ssl', active: false },
        { id: 2, description: 'Utilizar Url de Dev', active: false }
    ];
    selectAll() {
        // if (this.isAllChecked) {
        //     this.listaLog.map(item => {
        //         item.active = false
        //     });
        //     this.isAllChecked = false;
        // } else {
        //     this.listaLog.map(item => {
        //         item.active = true
        //     });
        //     this.isAllChecked = true;
        // }

        if (this.isAllChecked) {
            this.listaEmail.map(item => {
                item.active = false
            });
            this.isAllChecked = false;
        } else {
            this.listaEmail.map(item => {
                item.active = true
            });
            this.isAllChecked = true;
        }
    }

    changeType(opItem: DropDownList): void {
        const opEmail = this.listaEmail.find(item => item.id === opItem.id);
        // opEmail.active = !opItem.active;
        // if (opEmail.id === 1) {
        //     this.formulario.get('EnableSsl').setValue(opEmail.active);
        // } else {
        //     this.formulario.get('IsDev').setValue(opEmail.active);
        // }
    }
}