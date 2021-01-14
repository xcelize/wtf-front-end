// Composant token Interceptor
// par Julien GODEST
// Gère le token d'authentification qui est créé à la connexion d'un utilisateur, ce token représente l'utilisateur dans tout les appels à l'API.

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,

  HttpHeaders
} from '@angular/common/http';
import { UtilisateurService } from '../services/utilisateur.service';
import { Observable } from 'rxjs';
import { connexionService } from '../services/connexion.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private authService: connexionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCurrentUser();
    const token = this.authService.getCurrentToken();
    const isLoggedIn = currentUser && token;

    if (isLoggedIn) {
      req = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'JWT ' + token,
          'Content-Type': 'application/json'
        })
      });
    }
    return next.handle(req);
  }

}
