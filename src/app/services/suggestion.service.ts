// Service Suggestion
// par HUA Julie
// Gère 2 choses : 1- les appels à l'API pour récupérer les résultats d'une recherche rapide ou avancée
// 2- Appel l'API pour obtenir les suggestions/tendances pour notre utilisateur



// Importation des modules 
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../modeles/serie';
import { Video } from '../modeles/video';
import { Categorie } from '../modeles/categorie';
import { rechercheAvancee } from '../modeles/rechercheAvancee';
import { rechercheFilm } from '../modeles/rechercheFIlm';
import { rechercheSerie } from '../modeles/rechercheSerie';
import { suggestionFav } from '../modeles/suggestionFav';
import { suggestionRate } from '../modeles/suggestionRate';



@Injectable({
  providedIn: 'root'
})
export class SuggestionService {


  // 2 variables globales, url et url_serie, qui seront des liens de l'API
  url: string;
  url_serie: string;

  // constructeur 
  constructor(private _httpClient : HttpClient) { }

  getSuggestionsFavorisFilms(): Observable<suggestionFav>{
    return this._httpClient.get<suggestionFav>("https://wtf-api-v1.herokuapp.com/api/suggestion-favoris");
  }

  getTendancesFilms(): Observable<Array<Video>>{
    return this._httpClient.get<Array<Video>>("https://wtf-api-v1.herokuapp.com/api/tendance");
  }

  getSuggestionRatingFilm(): Observable<suggestionRate>{
    return this._httpClient.get<suggestionRate>("  https://wtf-api-v1.herokuapp.com/api/suggestion-rating");
  }

  rechercheRapide(url: string): Observable<rechercheFilm> {
   return this._httpClient.get<rechercheFilm>(url);
  }

  rechercheRapideSerie(url: string): Observable<rechercheSerie> {
    return this._httpClient.get<rechercheSerie>(url);
   }

  rechercheAvancee(url: string): Observable<rechercheFilm> {
    return this._httpClient.get<rechercheFilm>(url);
  }

  rechercheAvanceeSerie(url: string): Observable<rechercheSerie> {
  return this._httpClient.get<rechercheSerie>(url);
  }

  // Julie : fonction qui retourne un observable de type catégorie
  // Dans la fonction : on utilise le lien de l'API => qui ramène tous les objets Catégories

  getAllCategories(): Observable<Categorie> {
    let url = "https://wtf-api-v1.herokuapp.com/api/categories";
    return this._httpClient.get<Categorie>(url);
  }


  // Julie : Prend en paramètre un tableau de nombres qui correspond au numéro (id) des catégories,
  // cette fonction retourne un observable de type Video
  // Dans la fonction : utilisation du lien de l'API => préférences = de tout les films, prendre ceux dont les catégories sont égales au numéro (id) des catégories passés en paramètre
  // Exemple : tab_categorie [137,245]

  rechercheAvancee_Categorie_movies(tab_categorie: Array<number>): Observable<Video> {
    this.url = "https://wtf-api-v1.herokuapp.com/api/films?";
    for (let i = 0; i < tab_categorie.length; i++) {
      this.url += "categories=" + tab_categorie[i] + "&";
    }
    console.log(this.url);
    return this._httpClient.get<Video>(this.url);
  }

  // Julie : Prend en paramètre un tableau de nombres qui correspond au numéro (id) des catégories,
   // cette fonction retourne un observable de type Serie
  // Dans la fonction : utilisation du lien de l'API => préférences = de toute les séries,  prendre ceux dont les catégories sont égales au numéro (id) des catégories passés en paramètre
   // Exemple : tab_categorie [137,245]

  rechercheAvancee_Categorie_series(tab_categorie: Array<any>): Observable<Serie> {
    this.url_serie = "https://wtf-api-v1.herokuapp.com/api/series?";
    for (let i = 0; i < tab_categorie.length; i++) {
      this.url_serie += "categories=" + tab_categorie[i] + "&";
    }
    return this._httpClient.get<Serie>(this.url_serie);
  }

  // Julie : Prend en paramètre un tableau de nombres qui correspond au numéro (id) des catégories, et un tableau d'aucun type qui correspond au deux lettres des versions originales
  // cette fonction retourne un observable de type Video
  // Dans la fonction : utilisation du lien de l'API => préférences = de tout les films, prendre ceux dont les catégories sont égales au numéro (id) des catégories passés en paramètre
  // Exemple : tab_categorie [137,245]
  // tab_vo [en,ja]

  rechercheAvancee_vo_categories_movies(tab_categorie: Array<any>, tab_vo: Array<any>): Observable<Video> {
    this.url = "https://wtf-api-v1.herokuapp.com/api/films?";
    for (let i = 0; i < tab_categorie.length; i++) {
      this.url += "categories=" + tab_categorie[i] + "&";
    }
    for (let m = 0; m < tab_vo.length; m++) {
      this.url += "vo=" + tab_vo[m] + "&";
    }
    console.log(this.url);
    return this._httpClient.get<Video>(this.url);
  }

  // Julie : Utilisation de la surcharge (programmation objet)
  // La fonction est utilisé pour rassembler toute les préférences (d'apres le questionnaire répondu par l'utilisateur)
  // Utilisation d'une surcharge, car certains paramètres sont facultatifs, mais le nom de la fonction reste le meme
   
  rechercheAvancee_final_1(type: string,tab_categorie: Array<any>, duree: string); // 1er signature de la fonction 
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>, duree: string, vo: Array<any>); // 2eme signature de la fonction 
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>); // 3eme signature de la fonction 
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>, vo: Array<any>); // 4eme signature de la fonction
  // fonction écrite, elle prends au moins 2 paramètres, les deux autres suivants sont facultatifs
  // pour les deux autres, il peut être soit de type Tableau ou Chaîne de caractères
  // la fonction retourne un lien qui sera utilisé dans la redirection de page pour montrer les résultats de la recherche avancée
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>, duree?: string | Array<any>, vo?: Array<any> | string) { 
    this.url = "https://wtf-api-v1.herokuapp.com/api/";
    this.url += type;
    this.url += "?";
    for (let i = 0; i < tab_categorie.length; i++) {
        this.url += "&categories=" + tab_categorie[i] + "";
    }
    if (duree) {
      if (typeof (duree) == 'string') {
        this.url += "&duree<=" + duree;
      }
      if (typeof (duree) == 'object') {
        for (let i = 0; i < duree.length; i++) {
          this.url += "&vo=" + duree[i] + "&";
        }
      }
    }
    if (vo) {
      if (typeof (vo) == 'string') {
        this.url += "&duree<=" + vo;
      }
      if (typeof (vo) == 'object') {
        for (let i = 0; i < vo.length; i++) {
          this.url += "&vo=" + vo[i] + "&";
        }
      }
    }
    console.log(this.url);
    return this.url;
  }
}
