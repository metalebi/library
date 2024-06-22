import { Pipe, PipeTransform } from '@angular/core';
import { MagicGridFilterChecked } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';

@Pipe({
  name: 'magicGridFilterRendererInputPipe'
})
export class MagicGridFilterRendererInputPipePipe implements PipeTransform {

  transform(value: MagicGridFilterChecked[], textSearch: string): MagicGridFilterChecked[] {
    if (!textSearch)
      return value;
    return value.filter(v => v.title.toLowerCase().indexOf(textSearch.toLowerCase()) >= 0)
  }

}
