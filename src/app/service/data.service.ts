import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { InfoVehicule } from '../info-vehicule';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
=======
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicule } from '../models/vehicule';
import { Chauffeur } from '../models/Chauffeur';

>>>>>>> f25565ea5a12884eda434916e855e3582334d381

@Injectable({
  providedIn: 'root'
})
export class DataService {

<<<<<<< HEAD
  url_back = environment.baseUrl;
  infosVehiculesUrl= 'admin/vehicules'

  constructor(private _http:HttpClient) { }

  afficherInfo() : Observable<InfoVehicule[]>{
    return this._http.get<InfoVehicule[]>(`${this.url_back}${this.infosVehiculesUrl}`, {"withCredentials": true})
=======
  private subject = new Subject<Vehicule>();
  constructor( private _http: HttpClient) { }

  listeVehicules() :Observable<Vehicule[]> {
    return this._http.get<Vehicule[]>(`${environment.baseUrl}admin/vehicules`, {withCredentials:true});
  }

  enregistrerVehiculeSrv(vehicule: Vehicule) :Observable<Vehicule> {
    return this._http.post<Vehicule>(`${environment.baseUrl}admin/vehicules`, vehicule, {withCredentials:true});
  }

  ajoutChauffeur(matricule:any): Observable<string> {
    return this._http.patch<any>(`${environment.baseUrl}ajoutChauffeur/${matricule}`, {
      withCredentials : true
    });
  }

  recupCollegueChauffeur(): Observable<Chauffeur[]> {
    return this._http.get<Chauffeur[]>(`${environment.baseUrl}chauffeur`, {
      withCredentials: true
    });
>>>>>>> f25565ea5a12884eda434916e855e3582334d381
  }
}
