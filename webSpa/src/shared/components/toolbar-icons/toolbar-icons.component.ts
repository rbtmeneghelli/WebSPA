import { AfterViewInit, Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthGuardService } from '../../../core/services/auth-guard.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NotifyEntity } from '../../../core/models/notify.model';
import { take } from 'rxjs';
import { SnackBarService } from '../../../core/services/snackBar.service';
import { EnumActionMessage, EnumTypeMessage } from '../../../core/enums/enums';

@Injectable({
  providedIn: 'root'   // ✅ isso já registra automaticamente no root injector
})

@Component({
  selector: 'app-toolbar-icons',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatTooltipModule, RouterLink],
  templateUrl: './toolbar-icons.component.html',
})

export class ToolBarIconsComponent implements OnInit {

  public notifications: NotifyEntity[] = [];
  private readonly _AuthGuardService: AuthGuardService = inject(AuthGuardService);
  private readonly _NotificationService: NotificationService = inject(NotificationService);
  private readonly _SnackBarService: SnackBarService = inject(SnackBarService);
  public userName: string = this._AuthGuardService.getUserName();
  public userEmail: string = this._AuthGuardService.getUserEmail();

  ngOnInit(): void {
    this._NotificationService.getAllNotifications([]).pipe(take(1)).subscribe(response => {
      this._NotificationService.setNotifications(response.result as NotifyEntity[]);
      this.notifications = response.result as NotifyEntity[];
    }, error => {
      this._SnackBarService.sendSnackBarNotification('Erro para buscar as notificações', EnumTypeMessage.Personalized, EnumActionMessage.Error, false);
    });
  }

  logOut() {
    this._AuthGuardService.logout();
  }

  // async ngAfterViewInit(): Promise<void> {
  //   this._NotificationService._HubConnection.on('ReceiveMessage', (data) => {
  //     this._NotificationService.setNotifications(data);
  //   });

  //   this._NotificationService.getNotifications().subscribe((response: any) => {
  //     this.notifications = response;
  //   });
  // }
}

