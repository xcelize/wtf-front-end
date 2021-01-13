// Composant MinuteSecondsPipe
// par Alexis PETRAZ
// Filtre aussi appelé pipe en Angular permettant de transformer une valeur numérique (minutes) en heures + minutes. Utilisé dans diverses pages pour les durées des films/séries

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(num: any): any {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}:${minutes}`;
  }
}
