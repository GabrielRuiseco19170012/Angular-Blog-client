import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reversePipe'
})
export class ReversePipe implements PipeTransform {
  transform(value): unknown {
    if (value) {
      return value.slice().reverse();
    } else {
      return;
    }
  }
}
