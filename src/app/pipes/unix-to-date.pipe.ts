import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'unixToDate'
})
export class UnixToDatePipe implements PipeTransform {

  transform(unix: any): any {
    return moment.unix( unix ).format('MMM Do YY');
  }

}
