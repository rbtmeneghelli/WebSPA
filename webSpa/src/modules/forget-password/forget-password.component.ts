import { inject } from "@angular/core";
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FooterComponent } from "../../shared/components/footer/footer-component";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { EnumTypeMessage, EnumActionMessage } from "../../core/enums/enums";
import { SnackBarService } from "../../core/services/snackBar.service";
import { hasErrorFormControl } from "../../core/functions/shared-string.functions";
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, MatIconModule,
        MatFormFieldModule, MatInputModule, MatMenuModule, MatCheckboxModule, FooterComponent, ReactiveFormsModule, MatTooltipModule, RouterLink],
    templateUrl: './forget-password.component.html',
})

export class ForgetPasswordComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private snackBarService: SnackBarService = inject(SnackBarService);
    public form: FormGroup;
    public constant_variables = CONSTANT_VARIABLES;

    constructor() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    confirm(): void {
        const email = this.form.controls['email'].value;
        if (!!email) {
            this.snackBarService.sendSnackBarNotification(
                'Solicitação de reset de senha concluida. Você será notificado dentro de instantes!',
                EnumTypeMessage.Personalized,
                EnumActionMessage.Success,
                true
            );
        }
    }

    hasErrorFormControl(formControl: AbstractControl): string {
        return hasErrorFormControl(formControl);
    }
}