import { Routes } from '@angular/router';
import { UsersAddComponent } from './users-add.component';
import { UsersListComponent } from './users-list.component';

export const USERS_ROUTES: Routes = [
    {
        path: '', component: UsersListComponent
    },
    {
        path: 'new', component: UsersAddComponent
    }
];
