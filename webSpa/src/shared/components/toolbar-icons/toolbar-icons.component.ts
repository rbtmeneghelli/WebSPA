import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthGuardService } from '../../../core/services/auth-guard.service';

@Component({
  selector: 'app-toolbar-icons',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatTooltipModule, RouterLink],
  templateUrl: './toolbar-icons.component.html',
})

export class ToolBarIconsComponent {

  private _AuthGuardService: AuthGuardService = inject(AuthGuardService);
  public userEmail: string = this._AuthGuardService.getUserName();

  logOut() {
    this._AuthGuardService.logout();
  }
}

