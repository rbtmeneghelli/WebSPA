import { Component, effect, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from "../../../core/services/auth-guard.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})

export class FooterComponent {
  // Forma efetuada antes do Angular 16
  // @Input()
  // classColor: string = 'text-primary';

  private _AuthGuardService: AuthGuardService = inject(AuthGuardService);

  //Nova forma efetuada para Angular 16 ou superior
  classColor = input<string>('text-primary', { alias: 'classColor' });

  constructor() {
    // Tem o efeito semelhante ao NgOnChanges
    // effect(() => {
    //   console.log(this.classColor());
    // });
  }

  isAuthenticated() {
    return this._AuthGuardService.isAuthenticated();
  }
}

