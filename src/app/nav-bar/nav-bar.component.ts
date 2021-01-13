// Composant Nav Bar
// par Julien GODEST & Julie HUA
// Bar en haut de la page affichant le nom + prenom de l'utilisateur et bouton de deconnexion. Il y a un menu en haut à gauche qui permet d'accéder à de nouvelles pages.

import { Component, OnInit} from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { connexionService } from '../services/connexion.service';
import { Utilisateur } from '../modeles/utilisateur';
import { interval } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers:[connexionService]
})
export class NavBarComponent implements OnInit {

  UtilisateurData: Utilisateur;
  lettresInitiales : String;
  data$ = interval(10);
  data2$ = interval(1000);


  constructor(public nav: NavbarService, private connexionService: connexionService, private UtilisateurService : UtilisateurService) { }

  ngOnInit(): void {
    this.data$.subscribe(val => this.UtilisateurData = this.UtilisateurService.getUser());
    this.data2$.subscribe(val => this.lettresInitiales = this.UtilisateurData?.prenom.substr(0,1) + ' ' + this.UtilisateurData?.nom.substr(0,1));
}

  logout() {
    return this.connexionService.logout();
  }
}


