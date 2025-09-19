import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from '../modules/layout/layout.component';

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
        path: '', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            {
                path: 'finances',
                loadComponent: () => import('../modules/finances/finances.component').then(r => r.FinancesComponent)
            },
            {
                path: 'users',
                loadChildren: () => import('../modules/users/users.routes').then(r => r.USERS_ROUTES)
            },
            {
                path: 'profiles',
                loadChildren: () => import('../modules/profiles/profiles.routes').then(r => r.PROFILES_ROUTES)
            },
            {
                path: 'report',
                loadComponent: () => import('../modules/report-file/report-file.component').then(c => c.GenerateReportComponent)
            },
            {
                path: 'config-mail',
                loadComponent: () => import('../modules/config-mail/config-mail.component').then(c => c.ConfigMailComponent)
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
