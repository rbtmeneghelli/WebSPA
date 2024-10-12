import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatListModule, MatIconModule],
  templateUrl: './side-bar.component.html',
})

export class SideBarComponent {
  submenuOpen = false;

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}

