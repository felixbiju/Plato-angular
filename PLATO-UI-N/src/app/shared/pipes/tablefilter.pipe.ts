import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablefilter'
})

export class TableFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it.moduleName.toLowerCase().includes(searchText) === true) {
        return it.moduleName.toLowerCase().includes(searchText);
      } else if (it.moduleCreationDate.toLowerCase().includes(searchText) === true) {
        return it.moduleCreationDate.toLowerCase().includes(searchText);
      }
    });
  }
}
