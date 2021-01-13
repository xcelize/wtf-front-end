import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { MesFavorisComponent } from './mes-favoris/mes-favoris.component';
import { MainComponent } from './main/main.component';
import { RechercheRapideComponent } from './recherche-rapide/recherche-rapide.component';
import { MovieComponent } from './movie/movie.component';
import { PrimengModule } from './primeng/primeng.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { MinuteSecondsPipe } from './helpers/MinuteSecondsPipe';
import { SerieComponent } from './serie/serie.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    FaqComponent,
    QuiSommesNousComponent,
    InscriptionComponent ,
    ConnexionComponent,
    MonProfilComponent,
    MesFavorisComponent,
    MainComponent,
    RechercheRapideComponent,
    MovieComponent,
    MinuteSecondsPipe,
    SerieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    MaterialModule,
    MatRadioModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    PrimengModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
