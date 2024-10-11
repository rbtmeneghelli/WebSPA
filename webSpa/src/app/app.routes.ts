import { Routes } from '@angular/router';
import { LayoutComponent } from '../modules/layout.component';
import { UserComponent } from '../modules/users/users.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'user', component: UserComponent },
        ]
    }
];
