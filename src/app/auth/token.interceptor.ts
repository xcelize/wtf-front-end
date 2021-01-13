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
    this.token = this.authService.getCurrentToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: new HttpHeaders({
        'Authorization': 'JWT ' + this.token,
        'Content-Type': 'application/json'
      })
    });
    return next.handle(request);
  }

}
