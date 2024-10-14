import { Pipe, PipeTransform } from '@angular/core';
import { EnumAlternativa } from '../enums/enums';

@Pipe({
    name: 'choiceyesno'
})

export class ChoicePipe implements PipeTransform {
    transform(enumAlternativa: EnumAlternativa): string {
        const mapa = new Map<EnumAlternativa, string>();
        mapa.set(EnumAlternativa.Nao, 'Não');
        mapa.set(EnumAlternativa.Sim, 'Sim');
        return mapa.get((Number)(enumAlternativa)) ?? '';
    }
}
