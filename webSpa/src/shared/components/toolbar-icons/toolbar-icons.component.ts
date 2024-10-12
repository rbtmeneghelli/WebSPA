import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-toolbar-icons',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatTooltipModule],
  templateUrl: './toolbar-icons.component.html',
})

export class ToolBarIconsComponent {
}

