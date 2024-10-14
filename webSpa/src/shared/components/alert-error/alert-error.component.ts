import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-alert-error',
    standalone: true,
    imports: [RouterLink, MatIconModule, MatButtonModule],
    templateUrl: './alert-error.component.html'
})

export class AlertErrorComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}
