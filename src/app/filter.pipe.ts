// author : remy viannais
import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filterBy'
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(array: Array<any>, filterField: string, filterValue: string): Array<any> {
    if (!array) {return []; }
    return array.filter(item => item[filterField] === filterValue);
  }

}
