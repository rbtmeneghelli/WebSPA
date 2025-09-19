import { Routes } from '@angular/router';
import { ProfilesListComponent } from './profiles-list.component';

export const PROFILES_ROUTES: Routes = [
    {
        path: '', component: ProfilesListComponent
    },
    // {
    //     path: 'new', component: UsersAddComponent
    // },
    // {
    //     path: ':id/edit', component: UsersEditComponent
    // },
    // {
    //     path: ':id/view', component: UsersViewComponent
    // },
];
