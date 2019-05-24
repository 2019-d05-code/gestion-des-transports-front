import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { ReservationComponent } from './reservation/reservation.component';
import { CreationReservationComponent } from './creation-reservation/creation-reservation.component';
import { ImmatriculationValidatorDirective } from './validator/immatriculation-validator.directive';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { FilterPipe } from './filter.pipe';
import { LireReservationComponent } from './lire-reservation/lire-reservation.component';
import { VehiculeGestionComponent } from './vehicule-gestion/vehicule-gestion.component';
import { PhotoUrlValidatorDirective } from './validator/photo-url-validator.directive';

const routes: Routes = [
  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path:'auth', component: AuthComponent},
  {path:'reserver', component:ReservationComponent},
  {path:'reservations', component:LireReservationComponent},
  { path:'admin/vehicules', component: VehiculeGestionComponent},
  {path: 'admin/chauffeur', component: ChauffeurComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    ReservationComponent,
    CreationReservationComponent,
    VehiculeGestionComponent,
    PhotoUrlValidatorDirective,
    ImmatriculationValidatorDirective,
    ChauffeurComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
