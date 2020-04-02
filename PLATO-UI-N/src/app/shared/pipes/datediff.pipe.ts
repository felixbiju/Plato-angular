import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateDiff'})

export class DateDifference implements PipeTransform {
  transform(value: string): string {
    var one_day=1000*60*60*24;
    let today = new Date();
    let newDate = new Date(value);
    let days = this.round(((today.getTime() - newDate.getTime())/one_day), 0);
    if( days > 0) {
      return days+' day(s) ago';
    } else if( days === 0) {
      return 'Today';
    } else {
      return '-';
    }

  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}

