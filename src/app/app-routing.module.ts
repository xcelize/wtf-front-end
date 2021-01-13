import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {QuiSommesNousComponent} from './qui-sommes-nous/qui-sommes-nous.component';
import {FaqComponent} from './faq/faq.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { MainComponent } from './main/main.component';
import { MesFavorisComponent } from './mes-favoris/mes-favoris.component';
import { connexionService } from './services/connexion.service';
import { RechercheRapideComponent } from './recherche-rapide/recherche-rapide.component';
import { MovieComponent } from './movie/movie.component';
import { SerieComponent } from './serie/serie.component';


const routes: Routes = [
  { path: "",  component: HomeComponent },
  { path:"connexion", component: ConnexionComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "quisommesnous",  component: QuiSommesNousComponent , canActivate: [connexionService]},
  { path: "faq", component: FaqComponent , canActivate: [connexionService]},
  { path: "film/:id", component:MovieComponent, canActivate: [connexionService]},
  { path: "serie/:id", component:SerieComponent, canActivate: [connexionService]},
  { path: "main",  component: MainComponent, canActivate:[connexionService] },
  { path: "monprofil", component: MonProfilComponent, canActivate:[connexionService] },
  { path: "mesfavoris", component: MesFavorisComponent, canActivate: [connexionService] },
  { path: "recherche", component: RechercheRapideComponent, canActivate: [connexionService] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [connexionService]
})
export class AppRoutingModule { }
