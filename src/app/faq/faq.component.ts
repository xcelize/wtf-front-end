// Composant FAQ
// par Julien GODEST & Julie HUA
// Relatif à la page foire au question accessible par un bouton dans le footer

import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  panelOpenState = false;

  constructor(private nav: NavbarService) { nav.show() }


  ngOnInit(): void {
  }
}



