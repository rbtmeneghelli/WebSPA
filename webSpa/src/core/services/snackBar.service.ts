import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnumActionMessage, EnumTypeMessage } from '../enums/enums';

@Injectable({
    providedIn: 'root'
})

export class SnackBarService {

    constructor(protected readonly route: Router, protected snackBar: MatSnackBar) { }

    public sendSnackBarNotification(message: string, typeMessage?: EnumTypeMessage, actionMessage?: EnumActionMessage, isSuccess?: boolean) {
        this.snackBar.open(isSuccess ? this.getSnackBarMessage(message, typeMessage) : this.getSnackBarErrorMessage(message, typeMessage), '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: this.getPanelClass(actionMessage)
        });
    }

    public sendSnackBarStatus(actionMessage?: EnumActionMessage, isActive?: boolean) {
        this.snackBar.open(isActive ? 'O registro foi inativado com sucesso. ' : 'O registro foi ativado com sucesso', '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: this.getPanelClass(actionMessage)
        });
    }

    // tslint:disable-next-line: max-line-length
    public sendSnackBarNotificationRoute(message: string, typeMessage?: EnumTypeMessage, actionMessage?: EnumActionMessage, isSuccess?: boolean, routeDestiny?: string) {
        // tslint:disable-next-line: max-line-length
        const snackBarRef = this.snackBar.open(isSuccess ? this.getSnackBarMessage(message, typeMessage) : this.getSnackBarErrorMessage(message, typeMessage), '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: this.getPanelClass(actionMessage)
        });
        snackBarRef.afterDismissed().subscribe(() => {
            this.route.navigate([`/${routeDestiny}`]);
        });
    }

    public sendSnackBarNotificationLogOut(message: string, typeMessage?: EnumTypeMessage, actionMessage?: EnumActionMessage, isSuccess?: boolean) {
        // tslint:disable-next-line: max-line-length
        const snackBarRef = this.snackBar.open(isSuccess ? this.getSnackBarMessage(message, typeMessage) : this.getSnackBarErrorMessage(message, typeMessage), '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: this.getPanelClass(actionMessage)
        });
        snackBarRef.afterDismissed().subscribe(() => {
            localStorage.clear();
        });
    }

    private getSnackBarMessage(message: string, typeMessage?: EnumTypeMessage): string {
        switch (typeMessage) {
            case EnumTypeMessage.New:
                message = 'Cadastro efetuado com sucesso';
                break;
            case EnumTypeMessage.Edit:
                message = 'Edição efetuada com sucesso';
                break;
            case EnumTypeMessage.Delete:
                message = 'Exclusão efetuada com sucesso';
                break;
            case EnumTypeMessage.Export:
                message = 'Exportação de arquivo efetuada com sucesso';
                break;
            case EnumTypeMessage.TokenExpired:
                message = 'Sessão expirada, Faça o login novamente no sistema!'
                break;
        }
        return message;
    }

    private getSnackBarErrorMessage(message: string, typeMessage?: EnumTypeMessage): string {
        switch (typeMessage) {
            case EnumTypeMessage.New:
                message = 'Erro ao efetuar o cadastro do registro';
                break;
            case EnumTypeMessage.Edit:
                message = 'Erro ao efetuar a edição do registro';
                break;
            case EnumTypeMessage.Delete:
                message = 'Erro ao efetuar a exclusão do registro';
                break;
            case EnumTypeMessage.Export:
                message = 'Erro ao efetuar a exportação do arquivo';
                break;
            case EnumTypeMessage.TokenExpired:
                message = 'Sessão expirada, Deslogue e logue novamente no sistema!'
                break;
        }
        return message;
    }

    private getPanelClass(actionMessage?: EnumActionMessage): string[] {
        const array: string[] = [];
        switch (actionMessage) {
            case EnumActionMessage.Success:
                array.push('msg-success');
                break;
            case EnumActionMessage.Error:
                array.push('msg-error');
                break;
            case EnumActionMessage.Info:
                array.push('msg-info');
                break;
            case EnumActionMessage.Warning:
                array.push('msg-warning');
                break;
            default:
                array.push('msg-success');
                break;
        }
        return array;
    }
}
