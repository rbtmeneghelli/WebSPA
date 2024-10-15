import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersList } from '../../core/models/users/users.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONSTANT_VARIABLES } from '../../core/constants/variables.constant';
import { DropDownListModel } from '../../core/models/dropdown-list.model';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule,
        MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule, RouterLink, MatPaginatorModule, ReactiveFormsModule],
    templateUrl: './users-list.component.html',
})

export class UsersListComponent implements AfterViewInit {
    public textTable: string = 'Filtro de pesquisa';
    public subTextTable: string = 'Por meio da consulta, você pode consultar diferentes usuários, ou realizar uma busca mais aprofundada, preenchendo 1 ou mais campos dos filtros abaixo.';
    public textTableOptional: string = 'Lista de Usuários registrados';
    public actionLabel: string = 'usuário';
    public displayedColumns: string[] = ['name', 'profile', 'status', '#'];
    public constant_variables = CONSTANT_VARIABLES;

    public formBuilder: FormBuilder = inject(FormBuilder);
    public form: FormGroup;

    public profileList: DropDownListModel[] = [
        { id: 1, description: 'Administrador', active: true },
        { id: 2, description: 'Colaborador', active: true },
        { id: 3, description: 'Cliente', active: true }
    ];

    public statusList: DropDownListModel[] = CONSTANT_VARIABLES.FIX_DROPDOWNLIST_STATUS;
    public orderList: DropDownListModel[] = CONSTANT_VARIABLES.FIX_DROPDOWNLIST_ORDER;

    public usersList: UsersList[] = [
        { name: 'Roberto', profile: 'Administrador', status: true },
        { name: 'Antonio', profile: 'Colaborador', status: true },
        { name: 'Marisa', profile: 'Cliente', status: true },
        { name: 'Alik', profile: 'Cliente', status: true },
        { name: 'Murielle', profile: 'Cliente', status: false },
        { name: 'Gabriel', profile: 'Colaborador', status: true },
        { name: 'Jonatas', profile: 'Colaborador', status: true },
        { name: 'Pedro', profile: 'Colaborador', status: true },
        { name: 'Fernanda', profile: 'Cliente', status: false },
        { name: 'Michele', profile: 'Cliente', status: true },
    ];



    dataSource = new MatTableDataSource<UsersList>(this.usersList);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor() {
        this.form = this.formBuilder.group({
            nomeUsuario: ['', []],
            perfilUsuario: ['', []],
            status: ['2024', []],
            ordenacao: ['10', []],
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = this.constant_variables.ITEMS_PAGE_LABEL;
        this.dataSource.paginator._intl.firstPageLabel = this.constant_variables.FIRST_PAGE_LABEL;
        this.dataSource.paginator._intl.previousPageLabel = this.constant_variables.PREVIOUS_PAGE_LABEL;
        this.dataSource.paginator._intl.nextPageLabel = this.constant_variables.NEXT_PAGE_LABEL;
        this.dataSource.paginator._intl.lastPageLabel = this.constant_variables.LAST_PAGE_LABEL;
    }
}

