import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { Vehicule } from '../models/vehicule';

@Component({
  selector: 'app-vehicule-gestion',
  templateUrl: './vehicule-gestion.component.html',
  styleUrls: ['./vehicule-gestion.component.css']
})
export class VehiculeGestionComponent implements OnInit {

  listeV: Vehicule[] = [];
  listeVFiltree: Vehicule[] = [];
  vehiculeTmp: Vehicule = new Vehicule('','',[],'','',undefined);
  msgErreur: string;
  msgErreurSaveVehicule: string;
  filtre: string;

  constructor(private _srv: DataService) { }

  ngOnInit() {

    this._srv.listeVehicules().subscribe(
      returnValue => this.listeV = returnValue,
      err => this.msgErreur = err.error
    )

  }

  filtrerVehicules(filtre: string) {
    return this.listeV = this.listeV.filter(
      vehicule => vehicule.immatriculation.includes(filtre) || vehicule.marque.includes(filtre)
    );
  }

  enregistrerVehicule() {
    this._srv.enregistrerVehiculeSrv(this.vehiculeTmp).subscribe(
      returnValue => {
        console.log(returnValue);
        this.ngOnInit();
      },
      err => this.msgErreurSaveVehicule = err.error
    );
  }
}
