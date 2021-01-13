import { Injectable } from '@angular/core';
// Service Utilisateur
// par Julien GODEST
// Get et Set les informations personnelles de l'utilisateur ainsi qu'actualiser son token si celui est expiré (au bout d'une heure sur WhatTheFilm)

import { Video } from '../modeles/video';
import { FavorisService } from './favoris.service';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private FavorisService: FavorisService) { }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setUser(id: string, nomUser : string, prenomUser : string, email : string, pays : string, tel : string, dateNaissance : string, token : string, film_favoris : any[], serie_favoris :any[]) {

    // Token connexion qui est valable pour 1 hour, après ce temps il faudra se reconnecter.
    const expire_at  = moment().add(1, 'hour');
    localStorage.setItem('currentUser', JSON.stringify({'id':id, 'nom':nomUser, 'prenom':prenomUser, 'email':email, 'pays':pays, 'date_naissance': dateNaissance,'telephone':tel}));
    localStorage.setItem('token', token);
    localStorage.setItem('films_favoris', JSON.stringify(film_favoris));
    localStorage.setItem('series_favoris', JSON.stringify(serie_favoris));
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
  }

  clearUser() {
    localStorage.clear();
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getFavFilms(){
    return JSON.parse(localStorage.getItem('films_favoris'));
  }
  getFavSeries(){
    return JSON.parse(localStorage.getItem('series_favoris'));
  }

  updateToken(token: string){
    localStorage.setItem('token', token);
    const expire_at  = moment().add(1, 'hour');
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
  }
}
