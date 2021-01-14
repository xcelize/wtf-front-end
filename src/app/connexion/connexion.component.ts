// Composant Connexion
// par Julien GODEST
// Gère la connexion d'un utilisateur sur le site

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { connexionService } from '../services/connexion.service';
import { NavbarService } from '../services/navbar.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [connexionService]
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;

  constructor(private connexionService: connexionService, private nav: NavbarService, private router: Router, private messageService: MessageService) {
    nav.hide();
  }

  ngOnInit() {
    this.connexionForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  connexion() {
    this.connexionService.connexion(this.connexionForm).subscribe(
      data => {
        this.router.navigate(['/main']);
      },
      error => {
        console.log("erreur");
        this.messageService.add({ severity: 'error', summary: 'Erreur authentification', detail: 'Email et/ou mot de passe incorrect' });
      }
    )
  }
}

