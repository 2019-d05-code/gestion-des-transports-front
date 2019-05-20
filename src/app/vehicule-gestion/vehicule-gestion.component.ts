import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { Vehicule } from '../models/vehicule';

@Component({
  selector: 'app-vehicule-gestion',
  templateUrl: './vehicule-gestion.component.html'
})
export class VehiculeGestionComponent implements OnInit {

  listeV: Vehicule[] = [];
  msgErreur: string;

  constructor(private _srv: DataService) { }

  ngOnInit() {

    this._srv.listeVehicules().subscribe(
      returnValue => this.listeV = returnValue,
      err => this.msgErreur = err.error
    )

  }
}
