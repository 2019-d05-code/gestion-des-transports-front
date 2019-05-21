import { Injectable } from '@angular/core';
import { InfoVehicule } from '../info-vehicule';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url_back = environment.baseUrl;
  infosVehiculesUrl= 'admin/vehicules'

  constructor(private _http:HttpClient) { }

  afficherInfo() : Observable<InfoVehicule[]>{
    return this._http.get<InfoVehicule[]>(`${this.url_back}${this.infosVehiculesUrl}`, {"withCredentials": true})
  }
}
