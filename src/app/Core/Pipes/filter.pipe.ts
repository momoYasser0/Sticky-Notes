import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../Interfaces/notes';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(notes: Notes[], value: string): Notes[] {
    return notes.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
  }

}
