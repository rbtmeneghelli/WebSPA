import { Routes } from '@angular/router';
import { LayoutComponent } from '../modules/layout.component';
import { UsersListComponent } from '../modules/users/users-list.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'user', component: UsersListComponent },
        ]
    }
];
