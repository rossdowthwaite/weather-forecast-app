import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celcius'
})
export class CelciusPipe implements PipeTransform {

  transform(value: any): any {
    return value.toFixed(0) + '\xB0C.';
  }

}
