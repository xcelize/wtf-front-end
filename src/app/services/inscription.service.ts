// Service Inscription
// par Julien GODEST
// Récupère le formulaire d'inscription et appel l'API pour créer un nouvel utilisateur, si c'est OK on le connecte directement


import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { connexionService } from '../services/connexion.service';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(
    private connexionService: connexionService,
    private router: Router,
    private route: ActivatedRoute,
    private _utilisateurService : UtilisateurService,
    private httpClient: HttpClient) { }

  inscription(loginForm: any)  {

    let mail = loginForm.value["email"];
    let mdp = loginForm.value["password"];
    let nom = loginForm.value["nom"];
    let prenom = loginForm.value["prenom"];
    let date_naissance = loginForm.value["date_naissance"];
    let genre = loginForm.value["genre"];
    let telephone = loginForm.value["telephone"];
    let pays = loginForm.value["pays"].name;

    // Appel API

    this.httpClient.post<any>('https://wtf-api-v1.herokuapp.com/api/inscription', { 'email': mail, 'password' : mdp, 'nom': nom, 'prenom':prenom, 'telephone':telephone, 'pays':pays, 'genre' : genre, 'date_naissance':date_naissance}).subscribe(res => {
      if(res.email == mail){
        // Inscription réussi
        let connexionForm = new FormGroup({
          email: new FormControl(mail),
          password: new FormControl(mdp)
        })
        this.connexionService.connexion(connexionForm);
      }
    });
  }
}
