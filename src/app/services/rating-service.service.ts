// Service Rating
// par Alexis PETRAZ & Julie HUA
// Appel à l'API pour créé une nouvelle note ou modifier une note déjà existante que ce soit pour un film ou une série

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connexionService } from './connexion.service';
import { NoteSerie, NoteFilm } from '../modeles/note';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // variable globale urlFilm et urlSaison, liens utilisés pour appeler l'api
  urlFilm: string = "https://wtf-api-v1.herokuapp.com/api/films/rating"
  urlSaison: string = "https://wtf-api-v1.herokuapp.com/api/series/saison/rating"

  //constructeur
  constructor(private _http: HttpClient, private _authService: connexionService) { }


  // Julie : Fonction qui prends en paramètre la note d'un FILM
  // et qu'on envoie en post à l'API  (l'utilisateur ajoute pour la première fois une note pour un film donné)
  postRating(note: NoteFilm) {
    return this._http.post<NoteFilm>(this.urlFilm, note);
  }

  // Julie : Fonction qui prends en paramètre la note d'un FILM
  // et qu'on envoie en put à l'API (l'utilisateur modifie une note (le film a déjà été noté auparavant par le même utilisateur) pour un film donné)
  putRating(note: NoteFilm) {
    return this._http.put<NoteFilm>(this.urlFilm + "/" + note.id.toString(), note);
  }

  // Julie : Fonction qui prends en paramètre la note d'une Série  
  // et qu'on envoie en post à l'API  (l'utilisateur ajoute pour la première fois une note pour une série donné)
  postRatingSerie(note: NoteSerie) {
    return this._http.post<NoteSerie>(this.urlSaison, note);
  }

  // Julie : Fonction qui prends en paramètre la note d'une Série
  // et qu'on envoie en put à l'API (l'utilisateur modifie une note (la série a déjà été noté auparavant par le même utilisateur) pour une série donné)
  putRatingSerie(note: NoteSerie) {
    return this._http.put<NoteSerie>(this.urlSaison + "/" + note.id.toString(), note);
  }
}
