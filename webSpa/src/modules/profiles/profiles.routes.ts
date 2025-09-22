import { Routes } from '@angular/router';
import { ProfilesListComponent } from './profiles-list.component';
import { ProfilesAddComponent } from './profiles-add.component';
import { ProfilesEditComponent } from './profiles-edit.component';

export const PROFILES_ROUTES: Routes = [
    {
        path: '', component: ProfilesListComponent
    },
    {
        path: 'new', component: ProfilesAddComponent
    },
    {
        path: ':id/edit', component: ProfilesEditComponent
    },
    // {
    //     path: ':id/view', component: UsersViewComponent
    // },
];
