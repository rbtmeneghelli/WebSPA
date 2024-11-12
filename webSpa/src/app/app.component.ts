import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { fromEvent, map, merge, Observable, Observer, takeUntil } from 'rxjs';
import { SnackBarService } from '../core/services/snackBar.service';
import { EnumActionMessage, EnumTypeMessage } from '../core/enums/enums';
import { LayoutComponent } from '../modules/layout/layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  //take >> Obtem uma unica resposta do observable, fazendo o observable ser encerrado após resposta.
  //takeUntil >> Destroi o observable completamente sem necessidade de aguardar a resposta, assim que o componente for destruido. (Funcionalidade a partir do angular 15 ou inferior)
  //takeUntilDestroyed >> Destroi o observable completamente sem necessidade de aguardar a resposta, assim que o componente for destruido. (Funcionalidade a partir do angular 16 ou superior)
  ngOnInit(): void {
    this.createOnline().pipe(takeUntilDestroyed()).subscribe((isOnline: any) => {
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
