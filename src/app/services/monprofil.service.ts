// Service MonProfil
// par Julien GODEST et Julie HUA
// Modifie les informations de l'utilisateur dans le Store


// importation des modules 
import { Injectable } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../modeles/utilisateur';
import { connexionService } from './connexion.service';


@Injectable({
  providedIn: 'root'
})
export class MonprofilService {
  // constructeur
  constructor(private UtilisateurService : UtilisateurService, private _connexionService : connexionService,  private httpClient: HttpClient) {
  }

  // fonction qui prends en paramètre un objet de type Utilisateur
  // Dans la fonction : on modifie les informations à travers un lien vers l'API (voir dans le code), requête de type put, qui à un paramètres tous les infos de l'utilisateur modifié.
  // puis on utilise la fonction setUser du service UtilisateurService, qui va permettre de mettr à jour les données dans le localStorage
  modifyUser(user : Utilisateur) {
    this.httpClient.put<any>('https://wtf-api-v1.herokuapp.com/api/profil/'+this._connexionService.getCurrentUser().id, { 'email': user.email, 'nom': user.nom, 'prenom':user.prenom, 'telephone':user.telephone, 'pays':user.pays})
    .subscribe(res => {
      console.log(res);
     });
    this.UtilisateurService.setUser(
      this._connexionService.getCurrentUser().id,
      user.nom,
      user.prenom,
      user.email,
      user.pays,
      user.telephone,
      user.date_naissance,
      this.UtilisateurService.getToken(),
      this.UtilisateurService.getFavFilms(),
      this.UtilisateurService.getFavSeries())
  }



}



