// Composant Film
// par Julien GODEST
// Page détaillant un film (accessible avec la route /film/:id), affichage du poster, date, acteurs, plateformes, catégories ET possibilité de noter !
// Affichage de la moyenne de ce film donné par tous nos utilisateurs

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Video } from '../modeles/video';
import { Utilisateur } from '../modeles/utilisateur';
import {MovieService} from '../services/movie.service';
import { FavorisService } from '../services/favoris.service';
import { NoteFilm } from '../modeles/note';
import { RatingService } from '../services/rating-service.service';
import { connexionService } from '../services/connexion.service';
import {TooltipPosition} from '@angular/material/tooltip';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {

  video : Video;
  isTrailer : boolean = false;
  starVisible : boolean = true;
  id : number;
  time: string;
  actualRating: NoteFilm;
  UtilisateurData: Utilisateur;
  moyenneRating: number;
  spinner : Boolean = true;


  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private _movieService: MovieService,
    private FavorisService: FavorisService,
    private _ratingService: RatingService,
    private authService: connexionService
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this._movieService.getMovie(this.id).subscribe((video: Video) => {
      this.video = video;
      if (this.video.rates.length === 0) {
        this.actualRating = {
          id: null,
          user: this.authService.getCurrentUser().id,
          note: 0,
          film: this.video.id_video
        }
      } else {
        this.actualRating = this.video.rates[0];
      }
      this.spinner = false;
      this.moyenneRating = Number((this._movieService.getTotalNotes() / this._movieService.getnbrNotes()).toPrecision(2));
    });
  }
  ngDoCheck()	{
    this._movieService.setAncienneNote(this.actualRating.note);
  }

   ngAfterViewChecked(): void{
    this.checkIfFav(this.id);
    this.formatLabel(Number(this.video.duree));
  }


  ngOnChanges() : void{
    if(this.video.trailer !== "null"){
      this.isTrailer = true;
    }
  }

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    let ancienneNote = this._movieService.getAncienneNote();
    this.actualRating.film = this.video.id_video;
    if (this.actualRating.id == null) {
      this._ratingService.postRating(this.actualRating).subscribe(rate => {
        this.actualRating = rate;
        this.video.rates.push(rate);
        this._movieService.setNbrNotes();
        this._movieService.setTotalNotes(rate.note);
        this.moyenneRating = Number((this._movieService.getTotalNotes() / this._movieService.getnbrNotes()).toPrecision(2));
        this._movieService.setAncienneNote(this.actualRating.note);
      });
    } else {
      this._ratingService.putRating(this.actualRating).subscribe(rate => {
        rate.film = this.video.id_video;
        this.video.rates[0] = rate;
        this._movieService.setTotalNotes(-ancienneNote);
        this._movieService.setTotalNotes(this.actualRating.note);
        this.moyenneRating = Number((this._movieService.getTotalNotes() / this._movieService.getnbrNotes()).toPrecision(2));
      })
      this._movieService.setAncienneNote(this.actualRating.note);
    }
  }

  redirectUrl(trailer){
    window.open(trailer);
  }

  checkIfFav(item){
      if(this.FavorisService.checkIfFavFilm(item) == true){
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
      this.FavorisService.deleteFavorisFilm(item);
    }
    else {
      document.getElementById(s).style.color = "red";
      this.FavorisService.addFavorisFilm(item);
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

