import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-details-record',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './details-record.component.html',
})

export class DetailsRecordComponent {
    @Input() id!: number;
}

