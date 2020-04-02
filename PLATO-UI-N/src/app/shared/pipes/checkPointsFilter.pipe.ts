import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CheckPointsFilter'
})

export class CheckPointsFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it.module_name.toLowerCase().includes(searchText) === true) {
        return it.module_name.toLowerCase().includes(searchText);
      }
    });
  }

}
