import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chauffeur } from '../models/Chauffeur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) { }

  ajoutChauffeur(chauffeur:Chauffeur) {
    return this._http.post<Chauffeur>(`${environment.baseUrl}/ajoutChauffeur`, chauffeur, {
      withCredentials : true
    });
  }
}
