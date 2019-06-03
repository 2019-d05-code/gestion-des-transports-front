import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chauffeur } from '../models/Chauffeur';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styles: []
})
export class ChauffeurComponent implements OnInit {

  ajout: boolean = false;
  message: string;
  ident: any;
  trier :boolean = false;
  mat: any;
  nom: string;
  prenom: string;
  chauffeur = new Chauffeur(undefined, undefined, undefined, undefined, undefined, undefined,undefined);
  tabChauffeur = new Array();
  tabTrierChauffeur = new Array();

  constructor(private _serv: DataService) {
  }

  ngOnInit() {
    this._serv.recupCollegueChauffeur().subscribe(chauffeur => this.tabChauffeur = chauffeur, err => this.message = `${err}`);
  }

  triMat() {
    if (this.mat != "Ouvrir le menu de selection"){
      this.tabTrierChauffeur = this.tabChauffeur.filter(chauf => chauf.id == this.mat);
      this.trier=true;
    }else{
      this.trier = false;
    }

  }

  triNom(){
    if (this.nom != "Ouvrir le menu de selection"){
      this.tabTrierChauffeur = this.tabChauffeur.filter(chauf => chauf.nom == this.nom);
      this.trier=true;
    }else{
      this.trier = false;
    }

  }

  triPrenom(){
    if (this.prenom != "Ouvrir le menu de selection"){
      this.tabTrierChauffeur = this.tabChauffeur.filter(chauf => chauf.prenom == this.prenom);
      this.trier=true;
    }
    else{
      this.trier = false;
    }
  }


  // declenche la modal
  ajoutChauffeur() {
    this._serv.ajoutChauffeur(this.ident).subscribe(col => {
      this.tabChauffeur.push(col);
      this.ajout = true;
    },
      err => this.message = ` Erreur lors de l'ajout du collegue : ${err.error}`);
      this.ident = "";

  }
}
