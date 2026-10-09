import { Routes } from '@angular/router';
import { ProfilesListComponent } from './profiles-list.component';
import { ProfilesAddComponent } from './profiles-add.component';
import { ProfilesEditComponent } from './profiles-edit.component';
import { ProfilesViewComponent } from './profiles-view.component';
import { EnumFuncionality, EnumCRUDPermission } from '../../core/enums/enums';
import { AuthRoleGuard } from '../../core/guards/authRole.guard';

export const PROFILES_ROUTES: Routes = [
  {
    path: '',
    component: ProfilesListComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.PROFILE,
      crudPermission: EnumCRUDPermission.RESEARCH,
    },
  },
  {
    path: 'new',
    component: ProfilesAddComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.PROFILE,
      crudPermission: EnumCRUDPermission.CREATE,
    },
  },
  {
    path: ':id/edit',
    component: ProfilesEditComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.PROFILE,
      crudPermission: EnumCRUDPermission.UPDATE,
    },
  },
  {
    path: ':id/view',
    component: ProfilesViewComponent,
    canActivate: [AuthRoleGuard],
    data: {
      funcionalityId: EnumFuncionality.PROFILE,
      crudPermission: EnumCRUDPermission.RESEARCH,
    },
  },
];
