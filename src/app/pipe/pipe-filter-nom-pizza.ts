import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pipeFilterNomPizza',
  pure: false
})
export class PipeFilterNomPizza implements PipeTransform {
  transform(value: any[], nom: any, caseInsensitive: boolean): any {
    if (name !== undefined) {
      // filter users, users which match and return true will be kept, false will be filtered out
      return value.filter((pizza) => {
        if (caseInsensitive) {
          return (pizza.nom.toLowerCase().indexOf(nom.toLowerCase()) !== -1);
        } else {
          return (pizza.nom.indexOf(name) !== -1);
        }
      });
    }
    return value;
  }
}
