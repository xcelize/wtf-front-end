// Service Favoris
// par Julien GODEST
// Récupère ou modifie les favoris mis dans le localStorage, Appel à l'API pour ajouter/supprimer un favoris, fonction CheckIfFav() pour vérifier à l'affichage si la vidéo fait partie des favoris de l'utilisateur actuel

import { Injectable } from '@angular/core';
import { Video } from '../modeles/video';
import { Serie } from '../modeles/serie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  tabMesFavorisFilm: any[] = [];
  tabMesFavorisSerie: any[]= [];
  urlFilm: string = "https://wtf-api-v1.herokuapp.com/api/favoris/film"
  urlSerie: string = "https://wtf-api-v1.herokuapp.com/api/favoris/serie"
  constructor(private _http: HttpClient) {
    this.setFavorisFilm();
    this.setFavorisSerie();
   }

  getFavorisFilm() {
    return this.tabMesFavorisFilm;
  }

  setFavorisFilm(){
    this.tabMesFavorisFilm = JSON.parse(localStorage.getItem('films_favoris'));
  }

  getFavorisSerie() {
    return this.tabMesFavorisSerie;
  }

  setFavorisSerie(){
    this.tabMesFavorisSerie = JSON.parse(localStorage.getItem('series_favoris'));
  }

  deleteFavorisFilm(item : any){

    // BD DELETE
    let i = 0;
    let key;
    for(i; i < this.tabMesFavorisFilm.length; i++){
      if(this.tabMesFavorisFilm[i].film.id_video==item){
        key = this.tabMesFavorisFilm[i].id;
        this.tabMesFavorisFilm.splice(i,1);
        break;
      }
    }
    localStorage.setItem('films_favoris', JSON.stringify(this.tabMesFavorisFilm));

    // Delete to database
    return this._http.delete<any>(this.urlFilm + "/" + key).subscribe(res => {
      console.log(res);
    });
  }

  deleteFavorisSerie(item : any){

    // Local
    let i = 0;
    let key;
    for(i; i < this.tabMesFavorisSerie.length; i++){
      if(this.tabMesFavorisSerie[i].serie.id_video==item){
        key = this.tabMesFavorisSerie[i].id;
         this.tabMesFavorisSerie.splice(i,1);
           break;
        }
      }
      localStorage.setItem('series_favoris', JSON.stringify(this.tabMesFavorisSerie));

    // Delete to database
    return this._http.delete<any>(this.urlSerie + "/" + key).subscribe(res => {
      console.log(res);
    });
  }


  addFavorisFilm(item : any){
    console.log(this.getFavorisFilm());
    return this._http.post<any>(this.urlFilm, {"film" : item}).subscribe(res => {
      console.log(this.tabMesFavorisFilm);
      this.tabMesFavorisFilm.push(res);
      console.log(this.tabMesFavorisFilm);
      localStorage.setItem('films_favoris', JSON.stringify(this.tabMesFavorisFilm));
    });
  }

  addFavorisSerie(item : any){
    console.log(this.getFavorisSerie());
    return this._http.post<any>(this.urlSerie, {"serie" : item}).subscribe(res => {
      console.log(this.tabMesFavorisSerie);
      this.tabMesFavorisSerie.push(res);
      console.log(this.tabMesFavorisSerie);
      localStorage.setItem('series_favoris', JSON.stringify(this.tabMesFavorisSerie));
    });
  }

  checkIfFavFilm(item : any) : boolean{
    let i = 0;
    this.tabMesFavorisFilm.forEach(element => {
      if(element.film.id_video == item){
        i++;
      }
    });
    if(i > 0) return true; else return false;
  }

  checkIfFavSerie(item : any) : boolean{
    let i = 0;
    this.tabMesFavorisSerie.forEach(element => {
      if(element.serie.id_video == item){
        i++;
      }
    });
    if(i > 0) return true; else return false;
  }
}
