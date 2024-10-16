import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CONSTANT_VARIABLES } from '../../../core/constants/variables.constant';

@Component({
    selector: 'app-alert-error',
    standalone: true,
    imports: [RouterLink, MatIconModule, MatButtonModule],
    templateUrl: './alert-error.component.html'
})

export class AlertErrorComponent {
    public constant_variables = CONSTANT_VARIABLES;

    constructor(private location: Location) { }

    voltar(): void {
        this.location.back();
    }
}
