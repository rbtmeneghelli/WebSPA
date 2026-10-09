export class CredentialsRequest {
    login?: string = '';
    password?: string = '';
}

export class CredentialsResponse {
    roles?: Array<FuncionalityRoleResponse> = new Array<FuncionalityRoleResponse>();
    token?: string = '';
}

export class FuncionalityRoleResponse {
  funcionalityId?: number;
  crudPermissions?: string;
}
