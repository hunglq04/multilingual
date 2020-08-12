import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dotDate'})
export class DotDatePipe implements PipeTransform {
  transform(value) {
    return value.split('-').join('\.');
  }
}