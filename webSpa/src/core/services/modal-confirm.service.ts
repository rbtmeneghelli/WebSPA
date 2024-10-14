import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmServiceOptions } from '../models/modal-confirm.model';

@Injectable({
    providedIn: 'root'
})

export class ModalConfirmService {
    private _options = new Subject<ModalConfirmServiceOptions>();

    constructor(public dialog: MatDialog) { }

    get options() {
        return this._options.asObservable();
    }

    show(options: ModalConfirmServiceOptions, callBackFunction: Function) {
        if (options.text) {
            this._options.next(options);
        }

        const dialogRef = this.dialog.open(ModalConfirmComponent, {
            width: 'auto',
            minWidth: '25vw',
            hasBackdrop: true,
            disableClose: true
        });

        dialogRef.componentInstance.text = options.text;
        dialogRef.componentInstance.title = options.title;
        dialogRef.componentInstance.closeButton = options.closeButton;
        dialogRef.componentInstance.confirmButton = options.confirmButton;

        dialogRef.afterClosed().subscribe(result => callBackFunction(result));
    }

    hide() {
        this._options.next(null);
    }
}
