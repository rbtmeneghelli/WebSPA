import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../modules/layout.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { fromEvent, map, merge, Observable, Observer } from 'rxjs';
import { SnackBarService } from '../core/services/snackBar.service';
import { EnumActionMessage, EnumTypeMessage } from '../core/enums/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  public title = 'webSpa';
  private snackBarService: SnackBarService = inject(SnackBarService);

  ngOnInit(): void {
    this.createOnline().subscribe((isOnline: any) => {
      if (isOnline === false) {
        this.snackBarService.sendSnackBarNotification("Não foi possível prosseguir, por favor, verifique sua conexão à internet.", EnumTypeMessage.Personalized, EnumActionMessage.Info, true);
      }
    });
  }

  private createOnline() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
