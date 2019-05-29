import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { Vehicule } from '../models/vehicule';
import { CategorieVehiculeEnum } from '../enum/categorie-vehicule-enum.enum';

@Component({
  selector: 'app-vehicule-gestion',
  templateUrl: './vehicule-gestion.component.html',
  styleUrls: ['./vehicule-gestion.component.css']
})
export class VehiculeGestionComponent implements OnInit {

  listeV: Vehicule[] = [];
  listeVFiltree: Vehicule[] = [];
  vehiculeTmp: Vehicule = new Vehicule('','',undefined,'','',undefined,undefined);
  msgErreur: string;
  msgErreurSaveVehicule: string;
  filtre: string;
  listEnum: string[] = [];


  constructor(private _srv: DataService) { }

  ngOnInit() {

    this._srv.listeVehicules().subscribe(
      returnValue => this.listeV = returnValue,
      err => this.msgErreur = err.error
    )

    //chargement des categories de véhicules existantes
    this.listEnum.push(CategorieVehiculeEnum.MICRO_URBAINES);
    this.listEnum.push(CategorieVehiculeEnum.MINI_CITADINES);
    this.listEnum.push(CategorieVehiculeEnum.CITADINES_POLYVALENTES);
    this.listEnum.push(CategorieVehiculeEnum.COMPACTES);
    this.listEnum.push(CategorieVehiculeEnum.BERLINES_TAILLE_S);
    this.listEnum.push(CategorieVehiculeEnum.BERLINES_TAILLE_M);
    this.listEnum.push(CategorieVehiculeEnum.BERLINES_TAILLE_L);
    this.listEnum.push(CategorieVehiculeEnum.SUV_TOUTTERRAINS_PICKUP);

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
