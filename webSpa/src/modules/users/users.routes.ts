import { Routes } from '@angular/router';
import { UsersAddComponent } from './users-add.component';
import { UsersListComponent } from './users-list.component';
import { UsersEditComponent } from './users-edit.component';
import { UsersViewComponent } from './users-view.component';

export const USERS_ROUTES: Routes = [
    {
        path: '', component: UsersListComponent
    },
    {
        path: 'new', component: UsersAddComponent
    },
    {
        path: 'edit/:id', component: UsersEditComponent
    },
    {
        path: 'view/:id', component: UsersViewComponent
    },
];
