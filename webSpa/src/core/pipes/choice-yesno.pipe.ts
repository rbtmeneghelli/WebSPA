import { Pipe, PipeTransform } from '@angular/core';
import { EnumChoice } from '../enums/enums';

@Pipe({
    name: 'choiceyesno'
})

export class ChoicePipe implements PipeTransform {
    transform(enumChoice: EnumChoice): string {
        const mapa = new Map<EnumChoice, string>();
        mapa.set(EnumChoice.No, 'Não');
        mapa.set(EnumChoice.Yes, 'Sim');
        return mapa.get((Number)(enumChoice)) ?? '';
    }
}
