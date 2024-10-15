import { Component, inject, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FinancesModel } from "../../core/models/finances/finances.model";
import { DropDownListModel } from "../../core/models/dropdown-list.model";

@Component({
    selector: 'app-finances',
    standalone: true,
    imports: [MatIconModule, MatCardModule, MatListModule, CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatTabsModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, ReactiveFormsModule],
    templateUrl: './finances.component.html',
})

export class FinancesComponent {
    public textTable: string = 'Movimentação Financeira';
    public subTextTable: string = 'Ao clicar em um dos botões abaixo, você será redirecionado para a pagina da rede social escolhida.';
    public textPrincipal: string = 'conta a receber';
    public displayedColumns: string[] = ['registro', 'planoConta', 'descricao', 'data', 'formaRecebimento', 'valorTotal', '#'];
    public constant_variables = CONSTANT_VARIABLES;

    public formBuilder: FormBuilder = inject(FormBuilder);
    public form: FormGroup;

    public bankList: DropDownListModel[] = [
        { id: 1, description: 'Bradesco', active: true },
        { id: 2, description: 'Itau', active: true },
        { id: 3, description: 'Nubank', active: true },
        { id: 4, description: 'Picpay', active: true },
    ];

    public paymentFormList: DropDownListModel[] = [
        { id: 1, description: 'Cartão de crédito', active: true },
        { id: 2, description: 'Cartão de débito', active: true },
        { id: 3, description: 'Transferência bancaria', active: true },
        { id: 4, description: 'Dinheiro', active: true },
        { id: 5, description: 'Pix', active: true },
    ];

    public yearList: DropDownListModel[] = [
        { id: 2024, description: '2024', active: true },
        { id: 2023, description: '2023', active: true },
        { id: 2022, description: '2022', active: true },
        { id: 2021, description: '2021', active: true },
        { id: 2020, description: '2020', active: true },
    ];

    public monthList: DropDownListModel[] = [
        { id: 1, description: 'Janeiro', active: true },
        { id: 2, description: 'Fevereiro', active: true },
        { id: 3, description: 'Março', active: true },
        { id: 4, description: 'Abril', active: true },
        { id: 5, description: 'Maio', active: true },
        { id: 6, description: 'Junho', active: true },
        { id: 7, description: 'Julho', active: true },
        { id: 8, description: 'Agosto', active: true },
        { id: 9, description: 'Setembro', active: true },
        { id: 10, description: 'Outubro', active: true },
        { id: 11, description: 'Novembro', active: true },
        { id: 12, description: 'Dezembro', active: true },
    ];

    public financesList: FinancesModel[] = [
        { registro: 'RC-00000-00001', planoConta: 'Poupança', descricao: 'FGTS', data: this.constant_variables.CURRENT_DATE, formaRecebimento: 'Transferência Bancaria', valorTotal: 20000 },
        { registro: 'RC-00000-00002', planoConta: 'Salário', descricao: 'Trabalho', data: this.constant_variables.CURRENT_DATE, formaRecebimento: 'Pix', valorTotal: 15000 },
        { registro: 'RC-00000-00003', planoConta: 'Limite de cartão', descricao: 'Cartão Crédito Bradesco', data: this.constant_variables.CURRENT_DATE, formaRecebimento: 'Transferência Bancaria', valorTotal: 10000 },
        { registro: 'RC-00000-00004', planoConta: 'Limite de cartão', descricao: 'Cartão Crédito Itau', data: this.constant_variables.CURRENT_DATE, formaRecebimento: 'Transferência Bancaria', valorTotal: 3000 },
        { registro: 'RC-00000-00005', planoConta: 'Investimento', descricao: 'Banco Santander', data: this.constant_variables.CURRENT_DATE, formaRecebimento: 'Transferência Bancaria', valorTotal: 2000 },
    ];

    public dataSource = new MatTableDataSource<FinancesModel>(this.financesList);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor() {
        this.form = this.formBuilder.group({
            banco: [['1'], []],
            formaPagamento: [['1', '2'], []],
            ano: ['2024', []],
            mes: ['10', []],
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