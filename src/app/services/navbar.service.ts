// Service NavBar
// par Alexis PETRAZ
// Affiche ou cache la navBar selon la page

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean = true;

  constructor() { }

  hide() { this.visible = false; }
  show() { this.visible = true; }

}
