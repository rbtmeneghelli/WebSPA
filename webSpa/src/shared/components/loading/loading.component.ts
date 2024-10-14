import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loading.component.html'
})

export class LoadingComponent {
  public color = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = '50';
  public loading!: boolean;
  private loadingService: LoadingService = inject(LoadingService);

  constructor() {
    this.loadingService.isLoading.subscribe((v) => {
      this.loading = v;
    })
  }
}
