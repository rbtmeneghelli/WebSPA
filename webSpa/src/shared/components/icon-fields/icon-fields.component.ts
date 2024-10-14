import { Component, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatTabsModule} from '@angular/material/tabs';
import { PeriodicElement } from "../../../modules/users/users-list.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
    selector: 'app-icon-fields',
    standalone: true,
    imports: [MatIconModule, MatCardModule, MatListModule, CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonToggleModule, MatTooltipModule, MatTabsModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule],
    templateUrl: './icon-fields.component.html',
})

export class IconFieldsComponent {
    public displayedColumns: string[] = ['name', 'profile', 'status', '#'];
    public ELEMENT_DATA: PeriodicElement[] = [
        { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
        { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
        { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
        { id: 4, name: 'Alik', profile: 'Cliente', status: true },
        { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    ];
    public dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}