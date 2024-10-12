import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

export interface PeriodicElement {
    id: number;
    name: string;
    profile: string;
    status: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
    { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
    { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
    { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
    { id: 4, name: 'Alik', profile: 'Cliente', status: true },
    { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
];

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule],
    templateUrl: './users.component.html',
})

export class UserComponent implements AfterViewInit {
    varShowFilter:boolean = false;
    varShowFilterText: string = 'Exibir Filtro';
    displayedColumns: string[] = ['name', 'profile', 'status', '#'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    showFilter(){
        this.varShowFilter = !this.varShowFilter;
        this.varShowFilterText = this.varShowFilter ? 'OcultarFiltro' : 'Exibir Filtro';
    }
}

