// Composant Primeng
// Composant récupéré sur le site de Material (pas créé par nous)
// Créé des étoiles utiles pour noter un film

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';


const PrimeComponent = [
  CardModule,
  ButtonModule,
  MenubarModule,
  SharedModule,
  InputTextModule,
  PasswordModule,
  ToastModule,
  TableModule,
  BreadcrumbModule,
  DynamicDialogModule,
  RatingModule,
  ProgressSpinnerModule,
  DialogModule
]

@NgModule({
  declarations: [],
  imports: [PrimeComponent],
  exports: [PrimeComponent]
})
export class PrimengModule { }
