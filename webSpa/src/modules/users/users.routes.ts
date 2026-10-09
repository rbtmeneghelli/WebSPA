import { Routes } from '@angular/router';
import { UsersAddComponent } from './users-add.component';
import { UsersListComponent } from './users-list.component';
import { UsersEditComponent } from './users-edit.component';
import { UsersViewComponent } from './users-view.component';
import { EnumFuncionality, EnumCRUDPermission } from '../../core/enums/enums';
import { AuthRoleGuard } from '../../core/guards/authRole.guard';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.USER,
      crudPermission: EnumCRUDPermission.RESEARCH,
    },
  },
  {
    path: 'new',
    component: UsersAddComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.USER,
      crudPermission: EnumCRUDPermission.CREATE,
    },
  },
  {
    path: ':id/edit',
    component: UsersEditComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.USER,
      crudPermission: EnumCRUDPermission.UPDATE,
    },
  },
  {
    path: ':id/view',
    component: UsersViewComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.USER,
      crudPermission: EnumCRUDPermission.RESEARCH,
    },
  },
];
