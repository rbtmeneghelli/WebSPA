import { inject } from "@angular/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { DropDownListModel } from "../../core/models/dropdown-list.model";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SnackBarService } from "../../core/services/snackBar.service";

@Component({
    selector: 'app-report-file',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
    templateUrl: './report-file.component.html',
})

export class GenerateReportComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private snackBarService: SnackBarService = inject(SnackBarService);

    public textPage: string = 'Gerador de Relatórios';
    public subTextPage: string = 'Por meio do gerador de relatório, você será capaz de gerar relatórios complexos para analise de seus especialistas.';
    public constant_variables = CONSTANT_VARIABLES;
    public form: FormGroup;

    public reportList: DropDownListModel[] = [
        { id: 1, description: 'Relatório critico XPTO', active: true },
        { id: 2, description: 'Relatório de resultados XPTO', active: true },
        { id: 3, description: 'Relatório de dados unificados XPTO', active: true }
    ];

    public statusList: DropDownListModel[] = CONSTANT_VARIABLES.FIX_DROPDOWNLIST_STATUS;
    public fileList: DropDownListModel[] = CONSTANT_VARIABLES.FIX_DROPDOWNLIST_FILE;

    constructor() {
        this.form = this.formBuilder.group({
            report: ['', []],
            startDate: ['', []],
            endDate: ['', []],
            status: ['', []],
            format: ['', []],
        });
    }

    cleanForm(): void {
        this.form.reset();
    }
}