// Composant Connexion
// par Julien GODEST
// Gère la connexion d'un utilisateur sur le site

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { connexionService } from '../services/connexion.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [connexionService]
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;

  constructor(private connexionService: connexionService,private nav: NavbarService) {
    nav.hide();
  }

  ngOnInit() {
    this.connexionForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  connexion() {
    this.connexionService.connexion(this.connexionForm);
  }
}

