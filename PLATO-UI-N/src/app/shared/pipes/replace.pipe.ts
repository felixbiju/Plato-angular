import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceUnderscore'})

export class ReplaceUnderscore implements PipeTransform {
  transform(value: string): string {
    const find = '_';
    const re = new RegExp(find, 'g');
    return value.replace(re, ' ');
  }
}
