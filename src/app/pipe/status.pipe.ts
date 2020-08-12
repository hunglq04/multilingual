import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value) {
    switch(value) {
        case 'NEW':
            return 'New';
        case 'PLA':
            return 'Planning';
        case 'INP':
            return 'In Progress';
        case 'FIN':
            return 'Finished';
    }
  }
}