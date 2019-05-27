import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chauffeur } from '../models/Chauffeur';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.components.html',
  styles: []
})
export class ChauffeurComponent implements OnInit {

  trier :boolean = false;
  ajout: boolean = false;
  message: string;
  ident: any;
  mat: any;
  nom: string;
  prenom: string;
  chauffeur = new Chauffeur(undefined, undefined, undefined, undefined, undefined, undefined);
  tabChauffeur = new Array();
  tabTrierChauffeur = new Array();

  constructor(private _serv: DataService) {
  }

  ngOnInit() {
    this._serv.recupCollegueChauffeur().subscribe(chauffeur => this.tabChauffeur = chauffeur, err => this.message = `${err}`);
  }

  triMat() {
    this.tabTrierChauffeur = this.tabChauffeur.filter(chauf => this.mat == chauf.id);
    this.trier=true;
  }

  triNom(){
    this.tabTrierChauffeur = this.tabChauffeur.filter(chauf => this.nom == chauf.nom);
    this.trier=true;
  }

  triPrenom(){
    this.tabTrierChauffeur = this.tabChauffeur.filter(chauf => this.prenom == chauf.prenom);
    this.trier=true;
  }

  // declenche la modal
  ajoutChauffeur() {
    this._serv.ajoutChauffeur(this.ident).subscribe(col => {
      this.tabChauffeur.push(col);
      this.ajout = true;
    },
      err => this.message = ` Erreur lors de l'ajout du collegue : ${err.error}`);
  }
}
