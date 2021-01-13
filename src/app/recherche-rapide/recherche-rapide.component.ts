// Composant Recherche
// par Julien GODEST
// Page cible à la suite d'une recherche (rapide ou avancée), liste des résultats trouvés avec pagination si trop de résultats (50 résultats par page).

import { Component, OnInit, Input} from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Utilisateur } from '../modeles/utilisateur';
import { Video } from '../modeles/video';
import { Serie } from '../modeles/serie';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { rechercheFilm } from '../modeles/rechercheFIlm';
import { rechercheSerie } from '../modeles/rechercheSerie';
import { interval } from 'rxjs';

@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.css']
})
export class RechercheRapideComponent implements OnInit {

  ratingValue: number = 3;
  tabFilm : Video[];
  tabSerie : Serie[];
  tabMesFavorisFilm: any[] = [];
  tabMesFavorisSerie: any[] = [];
  UtilisateurData: Utilisateur;
  previous : string;
  next : string;
  nbrResultats : Number;
  url : string;
  film: Boolean;
  spinner: Boolean = true;
  data$ = interval(10);

  constructor(private _suggestionService: SuggestionService,private UtilisateurService : UtilisateurService, private FavorisService: FavorisService) {
    this.tabMesFavorisFilm = this.FavorisService.getFavorisFilm();
    this.tabMesFavorisSerie = this.FavorisService.getFavorisSerie();
  }

  ngOnInit(): void {
    this.UtilisateurData = this.UtilisateurService.getUser();
    this.data$.subscribe(val => this.tabMesFavorisFilm = this.FavorisService.getFavorisFilm());
    this.data$.subscribe(val => this.tabMesFavorisSerie = this.FavorisService.getFavorisSerie());
    if(localStorage.getItem('typeDeRecherche') == "rechercheRapide"){
      if(localStorage.getItem('filmOuSerie') == "film"){
        this.film = true;
        this.url = "/film/";
        this._suggestionService.rechercheRapide(localStorage.getItem('rechercheRapide')).subscribe((res: rechercheFilm) => {
          this.tabFilm = res.results;
          this.previous = res.previous;
          this.next = res.next;
          this.nbrResultats = res.count;
          this.spinner = false;
        });
      }
      else {
        this.url = "/serie/";
        this.film = false;
        this._suggestionService.rechercheRapideSerie(localStorage.getItem('rechercheRapide')).subscribe((res: rechercheSerie) => {
          this.tabSerie = res.results;
          this.previous = res.previous;
          this.next = res.next;
          this.nbrResultats = res.count;
          this.spinner = false;
        });
      }
    }
    else {
      if(localStorage.getItem('filmOuSerie') == "film"){
        this.url = "/film/";
        this.film = true;
        console.log("d");
        this._suggestionService.rechercheAvancee(localStorage.getItem('rechercheAvance')).subscribe((res: rechercheFilm) => {
          this.tabFilm = res.results;
          this.previous = res.previous;
          this.next = res.next;
          this.nbrResultats = res.count;
          this.spinner = false;
        });
      }
      else {
        this.url = "/serie/";
        this.film = false;
        this._suggestionService.rechercheRapideSerie(localStorage.getItem('rechercheAvance')).subscribe((res: rechercheSerie) => {
          this.tabSerie = res.results;
          this.previous = res.previous;
          this.next = res.next;
          this.nbrResultats = res.count;
          this.spinner = false;
        });
      }
    }
  }


  ngAfterViewInit()	: void{
    this.checkIfFav();
  }

  ngAfterViewChecked(): void{
    this.checkIfFav();
  }

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide(item.id_video);
  }

  checkIfFav(){
    if(localStorage.getItem('filmOuSerie') == "film"){
      if(this.tabFilm !== undefined){
    this.tabFilm.forEach(item => {
      if(this.FavorisService.checkIfFavFilm(item.id_video) == true){
        let s = "film_" + item.id_video;
        document.getElementById(s).style.color = "red";
      }
    });
  }
  }
  else {
    if(this.tabSerie !== undefined){

    this.tabSerie.forEach(item => {
      if(this.FavorisService.checkIfFavSerie(item.id_video) == true){
        let s = "serie_" + item.id_video;
        document.getElementById(s).style.color = "red";
      }
    });
  }
}
  }

  nextPage(){
    if(localStorage.getItem('typeDeRecherche') == "rechercheRapide"){
      localStorage.setItem('rechercheRapide', this.next);
    }
    this.spinner = true;
    this.ngOnInit();
  }

  previousPage(){
    if(localStorage.getItem('typeDeRecherche') == "rechercheRapide"){
      localStorage.setItem('rechercheRapide', this.previous);
    }
    this.spinner = true;
    this.ngOnInit();
  }

  addFav(what, item){
    this.checkIfFav();
    let s;
    if(what == 1){
       s = "film_" + item;
    }
    else {
      s = "serie_" + item;
    }
    if(document.getElementById(s).style.color == "red") {
      if(what == 1){
        this.FavorisService.deleteFavorisFilm(item);
      }
      else {
        this.FavorisService.deleteFavorisSerie(item);
      }
    }
    else {
      if(what == 1){
        this.FavorisService.addFavorisFilm(item);
      }
      else {
        this.FavorisService.addFavorisSerie(item);
      }
    }
  }

  showHide(modRef) {

    if (document.getElementById(modRef).style.visibility=="hidden")
      {
        // Contenu caché, le montrer
        document.getElementById(modRef).style.visibility = "visible";
      }
      else
      {
        // Contenu visible, le cacher
        document.getElementById(modRef).style.visibility = "hidden";
      }
}









}
