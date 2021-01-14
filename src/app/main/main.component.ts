// Composant Main
// par Julie HUA & Julien GODEST
// Page d'accueil quand l'utilisateur est connecté, affichage des suggestions et les boutons recherche rapide/avancée

// importation des modules
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { rechercheAvancee } from '../modeles/rechercheAvancee';
import { ViewChild, ViewChildren, Renderer2, ElementRef, QueryList } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../services/movie.service';
import { SerieService } from '../services/serie.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Video } from '../modeles/video';
import { map, retry, delay } from 'rxjs/operators';
import { Serie } from '../modeles/serie';
import { Categorie } from '../modeles/categorie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { suggestionFav } from '../modeles/suggestionFav';
import { suggestionRate } from '../modeles/suggestionRate';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // Julie : références des éléments div 
  @ViewChild('myButton') myButton: ElementRef;
  @ViewChild('myCategorie') myCategorie: ElementRef;
  @ViewChild('myLanguage') myLanguage: ElementRef;

  // Tableau de suggestion (selon les favoris, selon les rates)
  tabSuggestionsFavorisFilm: suggestionFav;
  tabSuggestionsRatingFilm: suggestionRate;

  // tableau de tendances des films et des séries 
  tabTendanceFilm: Array<Video>;
  tabTendanceSerie: Array<Serie>;

  // Julie : booléen recherche rapide/avancé
  isRechercheRapide: boolean = false;
  isRechercheAvance: boolean = false;

  // Julie : booléen utilisés pour l'affichage des div en HTML si true, initialisé à false
  Categorie: boolean = false;
  vo: boolean = false;
  language: boolean = false;
  duree: boolean = false;

  // Julie : formulaire 
  rechercheRapideForm: FormGroup;
  rechercheRapideSerieForm: FormGroup;
  rechercheAvanceeForm: FormGroup;
  shippingForm: FormGroup;
  CategorieForm: FormGroup;
  languageForm: FormGroup;
  voForm: FormGroup;
  shipping: FormGroup;
  dureeForm: FormGroup;
 
  // Julie : tableau de type Catégorie
  tabCategories: Array<Categorie> = [];
  listeMovie: Array<Categorie> = [];
  listeCategorieTest: Array<Categorie> = [];
  liste: Array<Categorie> = [];

  // Julie : objet de type série/video(pour film)
  lis: Serie;
  liste_after_categories_movies: Video;
  liste_after_categories_series: Serie;

  // Julie : tableau de type série/vidéo(pour film)
  listeVideos: Array<Video> = [];
  listeSeries: Array<Serie> = [];
  tab_liste_vo_after_movie: Array<Video> = [];
  tab_liste_vo_after_serie: Array<Serie> = [];

  // Julie : min et max de la durée provenant du tableau des films sélectionnés
  max: number;
  min: number;

  radioSelected : string = '';
  tab_vo: Array<any> = [] ;
  alerte: boolean;
  slider_value: number = 180;
  film_value: string = "film";

  // constructeur
  constructor(private nav: NavbarService, private suggestionService: SuggestionService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private face: FormBuilder, private renderer: Renderer2,
    private sanitizer: DomSanitizer, private _httpClient: HttpClient, private movieService: MovieService, private serieService: SerieService,private _snackBar: MatSnackBar) {
    nav.show()
  }

  ngOnInit(): void {

    // initialisation des formulaires déclarés dans le constructeur
    this.shipping = this.fb.group({
      signature: ['false'],
    })
    this.shippingForm = this.fb.group({
      signatureReq: ['film'],
    })
    this.languageForm = this.fb.group({
      julie: ['film'],
    })
    this.CategorieForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
    this.voForm = this.fb.group({
      check: this.fb.array([], [Validators.required])
    })
    this.dureeForm = new FormGroup({
      slider_value: new FormControl("", [Validators.required])
    })
    this.rechercheRapideForm = new FormGroup({
      recherche: new FormControl("", [Validators.required])
    })
    this.rechercheRapideSerieForm = new FormGroup({
      recherche: new FormControl("", [Validators.required])
    })


    this.suggestionService.getSuggestionsFavorisFilms().
      pipe(
        retry(3),
        delay(1000)
      )
      .subscribe((res: any) => {
      this.tabSuggestionsFavorisFilm = res.rating_suggestion;
      });

    this.suggestionService.getTendancesFilms().
      pipe(
        retry(3),
        delay(1000)
      )
      .subscribe((res: any) => {
      this.tabTendanceFilm = res;
      });

    this.suggestionService.getSuggestionRatingFilm().
      pipe(
        retry(3),
        delay(1000)
      )
      .subscribe((res: any) => {
      this.tabSuggestionsRatingFilm = res.favoris_suggestion;
    });
  }

  // évènement onChange pour les checkbox concernant les catégories
  // si la catégorie est coché (checked) alors elle est ajouté dans un tableau qui provient du formulaire 
  onCheckboxChange(e) {
    const checkArray: FormArray = this.CategorieForm.get('checkArray') as FormArray;
    if (e.checked==true) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });

    }
  }



  onCheckbox2Change(e) {


    const check: FormArray = this.voForm.get('check') as FormArray;

    if (e.checked) {


      check.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      check.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          check.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  afficherRapide() {
    this.isRechercheRapide = true;
    this.isRechercheAvance = false;
    this.Categorie = false;
    this.language = false;
    this.vo = false;
    this.duree = false;
  }

  formatLabel(value: number) {
    if (value < 60) {
      return value + "min"
    }
    if (value % 60 == 0) {
      return value / 60 + "h"
    }
    return (value / 60).toFixed(1).slice(0, 1) + "h" + value % 60 + "min"
  }


  afficherAvance() {
    this.isRechercheAvance = true;
    this.isRechercheRapide = false;
    this.language = false;
    this.Categorie = false;
    this.vo = false;
    this.duree = false;
    localStorage.removeItem('choix');
    localStorage.removeItem('categorie');
    localStorage.removeItem('vo');
    localStorage.removeItem('duree');
    localStorage.removeItem('rechercheAvance');
  }

  rechercheRapide() {
    localStorage.setItem('typeDeRecherche', "rechercheRapide");
    localStorage.setItem("filmOuSerie", "film");
    localStorage.setItem('rechercheRapide', "https://wtf-api-v1.herokuapp.com/api/films?titre=" + this.rechercheRapideForm.value['recherche']);
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/recherche';
    this.router.navigate([redirectUrl]);
  }
  rechercheRapideSerie() {
    localStorage.setItem('typeDeRecherche', "rechercheRapide");
    localStorage.setItem("filmOuSerie", "serie");
    localStorage.setItem('rechercheRapide', "https://wtf-api-v1.herokuapp.com/api/series?titre=" + this.rechercheRapideSerieForm.value['recherche']);
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/recherche';
    this.router.navigate([redirectUrl]);
  }

  rechercheAvancee() {
    if(localStorage.getItem("choix") == "series"){
      localStorage.setItem("filmOuSerie", "serie");
    }
    else {
      localStorage.setItem("filmOuSerie", "film");
    }
    localStorage.setItem('typeDeRecherche', "rechercheAvance");
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/recherche';
    this.router.navigate([redirectUrl]);
  }

  selected: string;
  filter: any;

  radioChange() {

    this.filter['property'] = this.selected;


  }

  changeRadioValue(): void {
    this.isRechercheRapide = false;
    console.log(this.shippingForm.get('signatureReq').value); // value : movie, series, both


    if (this.shippingForm.get('signatureReq').value == 'movie') {

      localStorage.setItem('choix', 'films');
    }
    if (this.shippingForm.get('signatureReq').value == 'series') {

      localStorage.setItem('choix', 'series');

      // WARNING !!!! can you guys keep this part ? I'd appreciate it, thanks dude
      //this.serieService.getAllSeries().subscribe((serie: Serie) => {
      //  for (let i = 0; i < serie.length; i++) {

      //    this.listeSeries.push(serie[i]);
      //    for (let m = 0; m < serie[i].categories.length; m++) {
      //      console.log(serie[i].categories[m].libelle);
      //      this.liste.push(serie[i].categories[m]);
      //    }
      //  }
      //  let result: Array<Categorie> = [];
      //  result = this.liste.reduce((unique, o) => {
      //    if (!unique.some(obj => obj.id_categ === o.id_categ)) {
      //      unique.push(o);
      //    }
      //    return unique;
      //  }, []);

    //  });
    }

    // BOTH

    this.Categorie = true;
    this.suggestionService.getAllCategories().subscribe((categorie: Categorie) => {
      this.listeCategorieTest = categorie.results;
      return this.listeCategorieTest;
    });
    var sentence_type = ``;
    this.renderer.setProperty(this.myButton.nativeElement, 'innerHTML', sentence_type);

  }

  SubmitCategorie(): void {
    console.log(this.CategorieForm.value.checkArray);
    let array = [];
    array  = Array.from(this.CategorieForm.value.checkArray);
    localStorage.setItem('categorie', JSON.stringify(array));

    if (localStorage.getItem('categorie') == "[]") {
      this.alerte = true;

      this._snackBar.open('Erreur : vous devez choisir au moins une des catégories présentes pour pouvoir profiter de notre sélection', 'fermer', {
        duration: 2000000,
        horizontalPosition:'center',
        verticalPosition:'top',
      });
    }
    else {
    if (localStorage.getItem('choix') == 'films') {
      this.suggestionService.rechercheAvancee_Categorie_movies(this.CategorieForm.value.checkArray).subscribe((video: Video) => {
        this.liste_after_categories_movies = video;
        return this.liste_after_categories_movies;
      });
    }
    if (localStorage.getItem('choix') == 'series') {
      this.suggestionService.rechercheAvancee_Categorie_series(this.CategorieForm.value.checkArray).subscribe((serie: Serie) => {
        this.liste_after_categories_series = serie;
        return this.liste_after_categories_series;
      });
    }

      this.language = true;
      var sentence_type = ``;
      this.renderer.setProperty(this.myCategorie.nativeElement, 'innerHTML', sentence_type);
    }

  }
  OnChangeduree() {
    this.slider_value  = this.dureeForm.value['slider_value'];
    console.log(this.slider_value);
    localStorage.setItem('duree', JSON.stringify(this.slider_value));
    //rechercheAvancee_final_1
    // si vo est vide
    if (localStorage.getItem('vo') == "") {
      localStorage.setItem('rechercheAvance', this.suggestionService.rechercheAvancee_final_1(localStorage.getItem('choix'), JSON.parse(localStorage.getItem('categorie')),localStorage.getItem('duree')));
      this.rechercheAvancee();
        //this.liste_after_categories_series = serie;
        //console.log(this.liste_after_categories_series);
        //return this.liste_after_categories_series;
    }
    else {
      localStorage.setItem('rechercheAvance', this.suggestionService.rechercheAvancee_final_1(localStorage.getItem('choix'), JSON.parse(localStorage.getItem('categorie')),localStorage.getItem('duree'), JSON.parse(localStorage.getItem('vo'))));
      this.rechercheAvancee();
    }
    // si le vo n'est pas vide

  }
  changeLanguageValue() {

    console.log(this.shipping.get('signature').value);

    if (this.shipping.get('signature').value == 'v' || this.shipping.get('signature').value == 'both') {
      if (localStorage.getItem('choix') == 'films') {


        localStorage.setItem('vo', "");


        let liste_duree=[];
        for (let i = 0; i < this.liste_after_categories_movies.results.length; i++) {

          liste_duree.push(this.liste_after_categories_movies.results[i].duree);
          console.log(this.liste_after_categories_movies.results[i].duree);

        }

        this.max = liste_duree.reduce((a, b) => Math.max(a, b));
        this.min = liste_duree.reduce((a, b) => Math.min(a, b));
        this.duree = true;
        this.language = false;
        console.log(this.min+'hey');
      }
      else {
        localStorage.setItem('rechercheAvance', this.suggestionService.rechercheAvancee_final_1(localStorage.getItem('choix'), JSON.parse(localStorage.getItem('categorie'))));
        this.rechercheAvancee();
          //this.liste_after_categories_series = serie;
          //console.log(this.liste_after_categories_series);
          //return this.liste_after_categories_series;
        // IMPLEMENTATION
      }
    }



    if (this.shipping.get('signature').value == 'vo') {
      if (localStorage.getItem('choix') == 'films') {
        for (let i = 0; i < this.liste_after_categories_movies.results.length; i++) {

          this.tab_vo.push(this.liste_after_categories_movies.results[i].vo);
          console.log(this.liste_after_categories_movies.results[i].vo);
        }
      }

      // film le vo ça marche
      if (localStorage.getItem('choix') == 'series') {
        for (let i = 0; i < this.liste_after_categories_series.results.length; i++) {
            this.tab_vo.push(this.liste_after_categories_series.results[i].vo);
        }

        }

      console.log(this.tab_vo);

      this.tab_vo = this.tab_vo.reduce((unique, o) => {
        if (!unique.some(obj => obj === o)) {
          unique.push(o);
        }
        return unique;
      }, []);
      console.log(this.tab_vo);

        this.vo = true;
        var sentence_type = ``;
        this.renderer.setProperty(this.myLanguage.nativeElement, 'innerHTML', sentence_type);
      }
  }



  SubmitVo(): void {
    console.log(this.voForm.value.check);
    let array = [];
    array = Array.from(this.voForm.value.check);
    localStorage.setItem('vo', JSON.stringify(array));
    if (localStorage.getItem('choix') == 'films') {
      this.suggestionService.rechercheAvancee_vo_categories_movies(this.CategorieForm.value.checkArray, JSON.parse(localStorage.getItem("vo"))).subscribe((video: Video) => {
        this.liste_after_categories_movies = video;
        let liste_duree = [];
        for (let i = 0; i < this.liste_after_categories_movies.results.length; i++) {

          liste_duree.push(this.liste_after_categories_movies.results[i].duree);
          console.log(this.liste_after_categories_movies.results[i].duree);

        }
        this.max = liste_duree.reduce((a, b) => Math.max(a, b));
        this.min = liste_duree.reduce((a, b) => Math.min(a, b));
        this.duree = true;
        this.language = false;
        console.log(this.min + 'hey');
      });
    }

    if (localStorage.getItem('choix') == 'series') {
        localStorage.setItem('rechercheAvance', this.suggestionService.rechercheAvancee_final_1(localStorage.getItem('choix'), JSON.parse(localStorage.getItem('categorie')),JSON.parse(localStorage.getItem('vo'))));
        this.rechercheAvancee();
        //this.liste_after_categories_series = serie;
        //console.log(this.liste_after_categories_series);
        //return this.liste_after_categories_series;
      }
    //this.language = true;
    //var sentence_type = ``;
    //this.renderer.setProperty(this.myCategorie.nativeElement, 'innerHTML', sentence_type);
  }


  }

