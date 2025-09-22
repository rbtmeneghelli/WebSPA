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
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users-list.component.html',
  providers: [NotificationService],
})

export class UsersListComponent implements AfterViewInit {
  public textTable: string = 'Filtro de pesquisa';
  public subTextTable: string =
    'Por meio da consulta, você pode consultar diferentes usuários, ou realizar uma busca mais aprofundada, preenchendo 1 ou mais campos dos filtros abaixo.';
  public textTableOptional: string = 'Lista de usuários registrados';
  public actionLabel: string = 'usuário';
  public displayedColumns: string[] = ['name', 'profile', 'status', 'credenciaisEnviadas', '#'];
  public constant_variables = CONSTANT_VARIABLES;

  public formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup;

  public profileList: DropDownListModel[] = [
    { id: 1, description: 'Administrador', active: true },
    { id: 2, description: 'Colaborador', active: true },
    { id: 3, description: 'Cliente', active: true },
  ];

  public statusList: DropDownListModel[] =
    CONSTANT_VARIABLES.FIX_DROPDOWNLIST_STATUS;
  public orderList: DropDownListModel[] =
    CONSTANT_VARIABLES.FIX_DROPDOWNLIST_ORDER;

  public usersList: UsersList[] = [
    {
      id: 1,
      name: 'Roberto',
      profile: 'Administrador',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 2,
      name: 'Antonio',
      profile: 'Colaborador',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 3,
      name: 'Marisa',
      profile: 'Cliente',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 4,
      name: 'Alik',
      profile: 'Cliente',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 5,
      name: 'Murielle',
      profile: 'Cliente',
      credenciaisEnviadas: false,
      status: false,
    },
    {
      id: 6,
      name: 'Gabriel',
      profile: 'Colaborador',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 7,
      name: 'Jonatas',
      profile: 'Colaborador',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 8,
      name: 'Pedro',
      profile: 'Colaborador',
      credenciaisEnviadas: true,
      status: true,
    },
    {
      id: 9,
      name: 'Fernanda',
      profile: 'Cliente',
      credenciaisEnviadas: false,
      status: false,
    },
    {
      id: 10,
      name: 'Michele',
      profile: 'Cliente',
      credenciaisEnviadas: false,
      status: true,
    },
  ];

  dataSource = new MatTableDataSource<UsersList>(this.usersList);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {
    this.form = this.formBuilder.group({
      nomeUsuario: ['', []],
      perfilUsuario: ['', []],
      status: [['1'], []],
      ordenacao: ['1', []],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel =
      this.constant_variables.ITEMS_PAGE_LABEL;
    this.dataSource.paginator._intl.firstPageLabel =
      this.constant_variables.FIRST_PAGE_LABEL;
    this.dataSource.paginator._intl.previousPageLabel =
      this.constant_variables.PREVIOUS_PAGE_LABEL;
    this.dataSource.paginator._intl.nextPageLabel =
      this.constant_variables.NEXT_PAGE_LABEL;
    this.dataSource.paginator._intl.lastPageLabel =
      this.constant_variables.LAST_PAGE_LABEL;
  }

  cleanForm(): void {
    this.form.reset();
    this.form.controls['status'].setValue(['1']);
    this.form.controls['ordenacao'].setValue('1');
  }
}
