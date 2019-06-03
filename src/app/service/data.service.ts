import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Vehicule } from '../models/vehicule';
import { Chauffeur } from '../models/Chauffeur';
import { tap } from 'rxjs/operators';
import { StatutVehicule } from '../models/statut-vehicule';
import { Reservation } from '../models/reservation';
import { InfoVehicule } from '../models/info-vehicule';
import { Annonce } from '../models/Annonce';
import { ReservationVehicule } from '../models/reservation-vehicule';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url_back = environment.baseUrl;
  infosVehiculesUrl = 'admin/vehicules'
  sauvegarderReservaURL = 'collaborateur/reservations/creer'
  reservationUrls = 'collaborateur/reservations'


  constructor(private _http: HttpClient) { }
  afficherInfo(): Observable<InfoVehicule[]> {
    return this._http.get<InfoVehicule[]>(`${this.url_back}${this.infosVehiculesUrl}`, { "withCredentials": true })
  }

  private subject = new Subject<Vehicule>();

  listeVehicules(): Observable<Vehicule[]> {
    return this._http.get<Vehicule[]>(`${environment.baseUrl}admin/vehicules`, { withCredentials: true });
  }

  enregistrerVehiculeSrv(vehicule: Vehicule): Observable<Vehicule> {
    return this._http.post<Vehicule>(`${environment.baseUrl}admin/vehicules`, vehicule, { withCredentials: true });
  }

  ajoutChauffeur(matricule: any): Observable<string> {
    return this._http.patch<any>(`${environment.baseUrl}ajoutChauffeur/${matricule}`, {
      withCredentials: true
    });
  }

  recupCollegueChauffeur(): Observable<Chauffeur[]> {
    return this._http.get<Chauffeur[]>(`${environment.baseUrl}chauffeur`, {
      withCredentials: true
    });
  }

  choisirVehicule(immatriculation: string): Observable<Vehicule> {
    return this._http.get<Vehicule>(`${environment.baseUrl}admin/vehicules/${immatriculation}`, { withCredentials: true })
      .pipe(
        tap(vo => this.subject.next(vo))
      );
  }

  changerStatutVehiculeSrv(statut: StatutVehicule): Observable<Vehicule> {
    return this._http.patch<Vehicule>(`${environment.baseUrl}admin/vehicules/${statut.immatriculation}`, statut, { withCredentials: true });
  }

  afficherReservationsSrv(): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(`${environment.baseUrl}collaborateur/reservations`, { withCredentials: true });
  }

  reservationAjouter(res: ReservationVehicule) {
    return this._http.post<ReservationVehicule>(`${this.url_back}${this.sauvegarderReservaURL}`, res, { "withCredentials": true })
  }

  //permet de récupérer l'ensemble des réservations se trouvant en base
  afficherLesReservation(): Observable<ReservationVehicule[]> {
    return this._http.get<ReservationVehicule[]>(`${this.url_back}${this.reservationUrls}`, { "withCredentials": true })
  }

  public creerAnnonce(annonce: Annonce): Observable<Annonce> {
    return this._http.post<Annonce>(`${environment.baseUrl}annonce/creer`, annonce, {
      withCredentials: true
    });
  }

  public listeAnnonces(emailAnnonceur: string) {
    return this._http.get<Annonce[]>(`${environment.baseUrl}annonce/liste?email=${emailAnnonceur}`);
  }

  public listeToutesAnnoncesEnCours() {
    return this._http.get<Annonce[]>(`${environment.baseUrl}annonce/liste/all-current`);
  }

}
