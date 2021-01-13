// Composant Favoris
// par Julien GODEST
// Page listant les favoris de l'utilisateur, avec la possibilité de supprimer le film/série de nos favoris et aussi d'aller voir la fiche technique de la vidéo.


import { Component, OnInit} from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { FavorisService } from '../services/favoris.service';
import { Video } from '../modeles/video';
import { interval } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';


@Component({
  selector: 'app-mes-favoris',
  templateUrl: './mes-favoris.component.html',
  styleUrls: ['./mes-favoris.component.css']
})
export class MesFavorisComponent implements OnInit {

  UtilisateurData: Utilisateur;
  tabMesFavorisFilm: any[];
  tabMesFavorisSerie: any[];
  ratingValue: number = 3;
  data$ = interval(10);

  constructor(private FavorisService: FavorisService, private utilisateurService : UtilisateurService) {
  }

  ngOnInit(): void {
    this.UtilisateurData = this.utilisateurService.getUser();
    this.tabMesFavorisFilm = this.FavorisService.getFavorisFilm();
    this.tabMesFavorisSerie = this.FavorisService.getFavorisSerie();
    this.data$.subscribe(val => this.tabMesFavorisFilm = this.FavorisService.getFavorisFilm());
    this.data$.subscribe(val => this.tabMesFavorisSerie = this.FavorisService.getFavorisSerie());
  }

  ngAfterViewInit()	: void{
    this.checkIfFav();
  }

  ngAfterViewChecked(): void{
    this.checkIfFav();
  }

  checkIfFav(){
    this.tabMesFavorisFilm.forEach(item => {
      if(this.FavorisService.checkIfFavFilm(item.film.id_video) == true){
        let s = "film_" + item.film.id_video;
        document.getElementById(s).style.color = "red";
      }
    });
    this.tabMesFavorisSerie.forEach(item => {
      if(this.FavorisService.checkIfFavSerie(item.serie.id_video) == true){
        let s = "serie_" + item.serie.id_video;
        document.getElementById(s).style.color = "red";
      }
    });
  }

  addFav(what, item){
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

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide(item.id_video);
  }




  toggleShowHide : string = "hidden";


 // showMyContainer1 : boolean ;
  showUndoBtn(item) {
    console.log(item);

    this.toggleShowHide="visible";

    // show btn with id btnId in DOM

    //this.item=false;

   // this.showMyContainer=true;
    //item.showButton = true;
}
status: boolean = false;
max : number =5;
showHide(modRef) {
    // hide the <div> with id == modRef

    // this.status = !this.status;
    // // if(this.status ) {

    // //   document.getElementById(modRef).style.display = 'none';
    // // } else {
    //   document.getElementById(modRef).style.display = 'block';
    // //}
    ;

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

reply_click(id)
{
    console.log(id);
}







}
