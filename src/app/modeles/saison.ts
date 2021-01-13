import { NoteSerie } from './note';

export class Saison {
  id_saison: number;
  nb_episode: number; 
  nom: string;
  num_saison: number;

  rates: Array<NoteSerie>; 
  
}
