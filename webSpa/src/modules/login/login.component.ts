import { inject, OnInit } from "@angular/core";
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FooterComponent } from "../../shared/components/footer/footer-component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, 
        MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule, MatCheckboxModule, FooterComponent, ReactiveFormsModule],
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    public form: FormGroup;
    public hidePassword!: boolean;
    protected formBuilder: FormBuilder = inject(FormBuilder);

    constructor() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
        this.hidePassword = true;
    }

    ngOnInit(): void {
    }

    login():void{

    }
}