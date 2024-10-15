import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { IconFieldsComponent } from '../../shared/components/icon-fields/icon-fields.component';

export interface PeriodicElement {
    id: number;
    name: string;
    profile: string;
    status: boolean;
}

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, 
        MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule, IconFieldsComponent, RouterLink, MatPaginatorModule],
    templateUrl: './users-list.component.html',
})

export class UsersListComponent  implements AfterViewInit {
    displayedColumns: string[] = ['name', 'profile', 'status', '#'];
    public ELEMENT_DATA: PeriodicElement[] = [
        { id: 1, name: 'Roberto', profile: 'Administrador', status: true },
        { id: 2, name: 'Antonio', profile: 'Colaborador', status: true },
        { id: 3, name: 'Marisa', profile: 'Cliente', status: true },
        { id: 4, name: 'Alik', profile: 'Cliente', status: true },
        { id: 5, name: 'Murielle', profile: 'Cliente', status: false },
        { id: 6, name: 'Gabriel', profile: 'Colaborador', status: true },
        { id: 7, name: 'Jonatas', profile: 'Colaborador', status: true },
        { id: 8, name: 'Pedro', profile: 'Colaborador', status: true },
        { id: 9, name: 'Fernanda', profile: 'Cliente', status: false },
        { id: 10, name: 'Michele', profile: 'Cliente', status: true },
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}

