import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], args: string, searchField: any[]): any[] | null {
    // To check if anyone not found from arrguments 
    if (!items || !args || !searchField) {
      return items;
    }

    const arg = args.toLowerCase();

    //To return filtered data 
    return items.filter((data) => {
      return searchField.some((key) => {
        return String(data[key]).toLowerCase().includes(arg);
      });
    });
  }
}
