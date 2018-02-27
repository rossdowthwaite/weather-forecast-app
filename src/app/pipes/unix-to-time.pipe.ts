import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'unixToTime'
})
export class UnixToTimePipe implements PipeTransform {

  transform(period: any): any {
    return moment.unix( period ).format('ha');
  }

}
