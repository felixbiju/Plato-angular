import { Pipe, PipeTransform } from '@angular/core';

import { Tools } from '../model/tools';

@Pipe({ name: 'colFormat' })

export class ColFormatPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    var newArr = [];
    while(value.length) {
      newArr.push(value.splice(0,2));
    }
    return newArr;
  }
}