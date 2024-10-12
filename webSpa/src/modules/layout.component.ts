import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/users.component';
import { FooterComponent } from "../shared/components/footer/footer-component";
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { ToolBarIconsComponent } from '../shared/components/toolbar-icons/toolbar-icons.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, MatTooltipModule,
    UserComponent, FooterComponent, SideBarComponent, ToolBarIconsComponent],
  templateUrl: './layout.component.html',
})

export class LayoutComponent {
  title = 'WebSPA';
}

