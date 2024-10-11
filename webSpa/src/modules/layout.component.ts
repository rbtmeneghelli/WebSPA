import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/users.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatDividerModule, MatButtonModule, CommonModule, UserComponent],
  templateUrl: './layout.component.html',
})

export class LayoutComponent {
  title = 'webSpa';
  submenuOpen = false;

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}

