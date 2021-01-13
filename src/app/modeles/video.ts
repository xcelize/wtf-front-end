import { Plateforme } from './plateforme';
import { Production } from './production';
import { Personne } from './personne';
import { Categorie } from './categorie';
import { NoteFilm} from './note';

export class Video {

    id_video: number;
    titre: string;
    date_sortie: Date;
    poster: string;
    plot: string;
    vo: string;
    rates: Array<NoteFilm>;
    duree: String;
    productions:Array<Production>;
    acteurs : Array<Personne>;
    plateformes : Array<Plateforme>;
    categories : Array<Categorie>;
    trailer : String;
    length: number;
    directeurs: Array<Personne>;
   results: Array<Video>;
    count: number;
}

