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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONSTANT_VARIABLES } from '../../core/constants/variables.constant';
import { DropDownListModel } from '../../core/models/dropdown-list.model';
import { NotificationService } from '../../core/services/notification.service';
import { ProfilesList } from '../../core/models/profiles/profiles.model';

@Component({
  selector: 'app-profiles-list',
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
  templateUrl: './profiles-list.component.html',
  providers: [NotificationService],
})
export class ProfilesListComponent implements AfterViewInit {
  public textTable: string = 'Filtro de pesquisa';
  public subTextTable: string =
    'Por meio da consulta, você pode consultar diferentes perfis de acesso, ou realizar uma busca mais aprofundada, preenchendo 1 ou mais campos dos filtros abaixo.';
  public textTableOptional: string = 'Lista de perfis de acesso registrados';
  public actionLabel: string = 'perfil de acesso';
  public displayedColumns: string[] = ['perfil', 'status', '#'];
  public constant_variables = CONSTANT_VARIABLES;

  public formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup;

  public statusList: DropDownListModel[] =
    CONSTANT_VARIABLES.FIX_DROPDOWNLIST_STATUS;
  public orderList: DropDownListModel[] =
    CONSTANT_VARIABLES.FIX_DROPDOWNLIST_ORDER;

  public profilesList: ProfilesList[] = [
    {
      id: 1,
      name: 'Administrador',
      status: true,
    },
    {
      id: 2,
      name: 'Colaborador',
      status: true,
    },
    {
      id: 3,
      name: 'Cliente',
      status: true,
    },
  ];

  dataSource = new MatTableDataSource<ProfilesList>(this.profilesList);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {
    this.form = this.formBuilder.group({
      nomePerfilAcesso: ['', []],
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
