import { Routes } from '@angular/router';
import { LayoutComponent } from '../modules/layout.component';

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: 'login',
        loadComponent: () => import('../modules/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'forget-password',
        loadComponent: () => import('../modules/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent)
    },
    {
        path: 'request-new-user',
        loadComponent: () => import('../modules/user-create/user-create.component').then(c => c.UserCreateComponent)
    },
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'finances',
                loadComponent: () => import('../shared/components/icon-fields/icon-fields.component').then(r => r.IconFieldsComponent)
            },
            {
                path: 'users',
                loadChildren: () => import('../modules/users/users.routes').then(r => r.USERS_ROUTES)
            },
            {
                path: 'report',
                loadComponent: () => import('../modules/report-file/report-file.component').then(c => c.GenerateReportComponent)
            },
            {
                path: 'config-email',
                loadComponent: () => import('../modules/config-email/config-email.component').then(c => c.ConfigEmailComponent)
            },
            {
                path: 'config-system',
                loadComponent: () => import('../modules/config-system/config-system.component').then(c => c.ConfigSystemComponent)
            },
            {
                path: 'support-contact',
                loadComponent: () => import('../modules/support-contact/support-contact.component').then(c => c.SupportContactComponent)
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('../shared/components/alert-error/alert-error.component').then(c => c.AlertErrorComponent),
        pathMatch: 'full'
    },
];
