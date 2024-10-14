import { OnInit } from "@angular/core";
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

@Component({
    selector: 'app-users-add',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule],
    templateUrl: './users-add.component.html',
})

export class UsersAddComponent implements OnInit {
    ngOnInit(): void {
    }
}