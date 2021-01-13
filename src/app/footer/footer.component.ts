// Composant Footer
// par Julien GODEST & Julie HUA
// Affiché sur toutes les pages quand l'utilisateur est connecté, celui ci contient des boutons vers d'autres pages du site ou des liens externes comme notre page Instagram, Youtube...

import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public nav: NavbarService,) { }

  ngOnInit(): void {
  }

}
