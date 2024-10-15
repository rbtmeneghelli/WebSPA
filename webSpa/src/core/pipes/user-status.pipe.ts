import { Pipe, PipeTransform } from '@angular/core';
import { EnumUserStatus } from '../enums/enums';


@Pipe({
    name: 'userStatus'
})

export class UserStatusPipe implements PipeTransform {
    transform(userStatus: boolean): string {
        // Dicionario do C# em TypeScript
        const userStatusDescription: { [key: number]: string } = {
            [EnumUserStatus.Active]: 'Ativo',
            [EnumUserStatus.Inactive]: 'Inativo',
        };
        const status = userStatus ? EnumUserStatus.Active : EnumUserStatus.Inactive;
        return userStatusDescription[status] ? userStatusDescription[status] : 'Inválido';
    }
}
