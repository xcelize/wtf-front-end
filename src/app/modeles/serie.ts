
import { Plateforme } from './plateforme';
import { Production } from './production';
import { Personne } from './personne';
import { Categorie } from './categorie';
import { NoteSerie } from './note';
import { Saison } from './saison';
import { Video } from './video';

export class Serie {

  id_video: number;
  titre: string;
  nb_saison: string;
  date_sortie: Date;
  poster: string;
  plot: string;
  vo: string;
  rates: Array<NoteSerie>;
  duree: String;
  productions:Array<Production>;
  acteurs : Array<Personne>;
  plateformes : Array<Plateforme>;
  categories : Array<Categorie>;
  trailer: String;
  saisons: Array<Saison>;
  length: number;
  results: Array<Video>;
  directeurs: Array<Personne>;

}
