import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  //Nova forma efetuada para Angular 16 ou superior
  classColor = input<string>('text-primary', { alias: 'classColor' });

  constructor() {
    // Tem o efeito semelhante ao NgOnChanges
    // effect(() => {
    //   console.log(this.classColor());
    // });
  }
}

