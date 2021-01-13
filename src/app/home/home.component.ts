// Composant Home
// par Alexis PETRAZ
// Premiere page quand on arrive sur le site non connecté, affichage au milieu de l'écran du logo de What The Film

import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private nav: NavbarService) {

    nav.hide()

  }

  ngOnInit(): void {
  }

}
