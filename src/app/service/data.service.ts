import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicule } from '../models/Vehicule';
import { Chauffeur } from '../models/Chauffeur';
import { Annonce } from '../models/Annonce';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<Vehicule>();
  constructor(private _http: HttpClient) { }

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

  public creerAnnonce(annonce: Annonce): Observable<Annonce> {
    return this._http.post<Annonce>(`${environment.baseUrl}annonce/creer`, annonce, {
      withCredentials: true
    });
  }

}
