import { AuthGuardService } from './../../core/services/auth-guard.service';
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
import { CONSTANT_VARIABLES } from "../../core/constants/variables.constant";
import { SnackBarService } from "../../core/services/snackBar.service";
import { hasErrorFormControl } from "../../core/functions/shared-string.functions";
import { EnumActionMessage, EnumTypeMessage } from "../../core/enums/enums";
import { CredentialsModel } from '../../core/models/credentials.model';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterOutlet, MatSelectModule, CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, MatIconModule,
        MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule, MatCheckboxModule, FooterComponent, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    providers:[AuthGuardService]
})

export class LoginComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private _SnackBarService: SnackBarService = inject(SnackBarService);
    private _AuthGuardService: AuthGuardService = inject(AuthGuardService);

    public form: FormGroup;
    public hidePassword: boolean = true;
    public constant_variables = CONSTANT_VARIABLES;

    constructor() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    confirm(): void {
        const email = this.form.controls['email'].value;
        const password = this.form.controls['password'].value;
        if (email === 'admin@gmail.com' && password === 'Admin@123') {
            this._AuthGuardService.keepUserData(new CredentialsModel());
            this._SnackBarService.sendSnackBarNotificationRoute(
                'Login efetuado com sucesso',
                EnumTypeMessage.Login,
                EnumActionMessage.Success,
                true,
                'users'
            );
        } else {
            this._SnackBarService.sendSnackBarNotification(
                'Email ou senha invalidos. tente novamente!',
                EnumTypeMessage.Personalized,
                EnumActionMessage.Error,
                false
            );
        }
    }

    hasErrorFormControl(formControl: AbstractControl): string {
        return hasErrorFormControl(formControl);
    }
}