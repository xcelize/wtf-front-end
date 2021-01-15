// Composant Série
// par Julien GODEST
// Page détaillant une série (accessible avec la route /serie/:id), affichage du poster, date, acteurs, plateformes, catégories ET possibilité de noter chaque saison!
// Affichage de la moyenne par saison donné par tous nos utilisateurs, et également une moyenne globale de la série.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Serie } from '../modeles/serie';
import { Utilisateur } from '../modeles/utilisateur';
import { SerieService} from '../services/serie.service';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { NoteSerie } from '../modeles/note';
import { RatingService } from '../services/rating-service.service';
import { connexionService } from '../services/connexion.service';
import { Plateforme } from '../modeles/plateforme';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  serie : Serie;
  UtilisateurData: Utilisateur;
  isTrailer : boolean = false;
  starVisible : boolean = true;
  id : number;
  time: string;
  maNoteTemporaire: number = 3;
  actualRating : Array<NoteSerie> = [];
  nbrEpisodesTotal: number = 0;
  moyenneRatingBySaison: Array<number> = [];
  totalRating: number = 0;
  moyenneRating: number = 0;
  spinner : Boolean = true;

  constructor( private route: ActivatedRoute,
    private _location: Location,
    private _serieService: SerieService,
    private FavorisService: FavorisService,
    private utilisateurService: UtilisateurService,
    private _ratingService: RatingService,
    private authService: connexionService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this._serieService.getSerie(this.id).subscribe((serie: Serie) => {
      this.serie = serie;
      let i = 0;
      this.UtilisateurData = this.utilisateurService.getUser();
      for(let saison of this.serie.saisons){
        this.nbrEpisodesTotal += Number(saison.nb_episode);
        if (saison.rates.length === 0) {
          this.actualRating[saison.id_saison] = {
            id: null,
            user: this.authService.getCurrentUser().id,
            note: 0,
            saison: saison.id_saison,
          };
        } else {
          this.actualRating[saison.id_saison] = saison.rates[0];
        }
        this.moyenneRatingBySaison[saison.id_saison] = Number((Number(this._serieService.getTotalNotes(saison.id_saison)) / Number(this._serieService.getnbrNotes(saison.id_saison))).toPrecision(2));
        if(this.moyenneRatingBySaison[saison.id_saison]){

          this.totalRating += Number(this.moyenneRatingBySaison[saison.id_saison].toPrecision(2));
          i +=1;
        }
      }
      this.moyenneRating = Number((this.totalRating / i).toPrecision(2));
      this.spinner = false;
    });
  }

  ngOnChanges() : void{
    if(this.serie.trailer !== "null"){
      this.isTrailer = true;
    }
  }

  ngDoCheck()	{
    for(let saison of this.serie.saisons){
      if(saison.rates[0] != null){
        this._serieService.setAncienneNote(saison.id_saison, this.actualRating[saison.id_saison].note);
      }
    }
  }

  ngAfterViewChecked(): void{
    this.checkIfFav(this.id);
    this.formatLabel(Number(this.serie.duree));
  }


  getSerie():void{
      this._serieService.getSerie(this.id)
        .subscribe(serie => this.serie = serie);
    }

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    let i = 0;
    let ancienneNote = this._serieService.getAncienneNote(item.id_saison);
    this.actualRating[item.id_saison].saison = item.id_saison;
    console.log(ancienneNote);
    if (this.actualRating[item.id_saison].id == null) {
      this._ratingService.postRatingSerie(this.actualRating[item.id_saison]).subscribe(rate => {
        this.actualRating[item.id_saison] = rate;
        this._serieService.setNbrNotes(item.id_saison);
        this._serieService.setTotalNotes(rate.note, item.id_saison);
        this.moyenneRatingBySaison[item.id_saison] = Number((Number(this._serieService.getTotalNotes(item.id_saison)) / Number(this._serieService.getnbrNotes(item.id_saison))).toPrecision(2));
        let totalRating = 0;
        for(let saison of this.serie.saisons){
          if(this.moyenneRatingBySaison[saison.id_saison]){
            totalRating += Number(this.moyenneRatingBySaison[saison.id_saison]);
            i+= 1;
          }
        }
        this.moyenneRating = Number((totalRating / i).toPrecision(2));
      });
    } else {
      this._ratingService.putRatingSerie(this.actualRating[item.id_saison]).subscribe(rate => {
        this.actualRating[item.id_saison] = rate;
        this._serieService.setTotalNotes(-ancienneNote, item.id_saison);
        this._serieService.setTotalNotes(rate.note, item.id_saison);
        this.moyenneRatingBySaison[item.id_saison] = Number((Number(this._serieService.getTotalNotes(item.id_saison)) / Number(this._serieService.getnbrNotes(item.id_saison))).toPrecision(2));
        let totalRating = 0;
        for(let saison of this.serie.saisons){
          if(this.moyenneRatingBySaison[saison.id_saison]){
            totalRating += Number(this.moyenneRatingBySaison[saison.id_saison]);
            i+= 1;
          }
        }
        this.moyenneRating = Number((totalRating / i).toPrecision(2));
      });
    }
    this._serieService.setAncienneNote(item.id_saison, this.actualRating[item.id_saison].note);
  }

  redirectUrl(plateforme: Plateforme) {
    let url: string;
    if (plateforme.nom === "Netflix") {
      url = "https://www.google.com/search?q=" + plateforme.nom + "+" + this.serie.titre + "&btnI";
      console.log(url);
    } else {
      url = plateforme.lien;
    }
    window.open(url);
  }

  checkIfFav(item){
    if(this.FavorisService.checkIfFavSerie(item) == true){
      let s = "fav_" + item;
      document.getElementById(s).style.color = "red";
    }
}

addFav(item){
  console.log(item);
  let s = "fav_" + item;
  console.log(s);
  if(document.getElementById(s).style.color == "red") {
    document.getElementById(s).style.color = "white";
    this.FavorisService.deleteFavorisSerie(item);
  }
  else {
    document.getElementById(s).style.color = "red";
    this.FavorisService.addFavorisSerie(item);
    // On ajoute cette video de la BD Favoris
  }
}

  showHide() {
    this.starVisible = !this.starVisible;
  }

  formatLabel(value: number) {
    if (value < 60){
      this.time = value + "min"
    }
    if(value % 60 == 0){
    this.time = value / 60 + "h"
    }
    this.time = (value / 60).toFixed(1).slice(0,1)+ "h" + value % 60 + "min"
  }

}
