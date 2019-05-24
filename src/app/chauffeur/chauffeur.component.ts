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

  /*
  tri() {
    this.tabTrierChauffeur = [];
    for ( let chauf of this.tabChauffeur) {
      console.log(this.mat)
      console.log(this.tabTrierChauffeur);
      if (this.mat != undefined && this.nom != undefined && this.prenom != undefined) {
        if (chauf.matricule === this.mat && chauf.nom === this.nom && chauf.prenom === this.prenom) {
          this.tabTrierChauffeur.push(chauf);
        }
      }
      else if (this.mat != undefined && this.nom != undefined) {
        if (chauf.matricule === this.mat && chauf.nom === this.nom) {
          this.tabTrierChauffeur.push(chauf);
        }
      }
      else if (this.mat != undefined && this.prenom != undefined) {
        if (chauf.matricule === this.mat && chauf.prenom === this.prenom) {
          this.tabTrierChauffeur.push(chauf);
        }
      }
      else if (this.nom != undefined && this.prenom != undefined) {
        if (chauf.nom === this.nom && chauf.prenom === this.prenom) {
          this.tabTrierChauffeur.push(chauf);
        }
      }
      else if (this.mat != undefined) {
        if (chauf.matricule === this.mat) {
          this.tabTrierChauffeur.push(chauf);

        }
      }
      else if (this.nom != undefined) {
        console.log(chauf);
        if (chauf.nom === this.nom) {
          this.tabTrierChauffeur.push(chauf);
        }
      }
      else if (this.prenom != undefined) {
        if (chauf.prenom === this.prenom) {
          this.tabTrierChauffeur.push(chauf);
        }
      }
      else if (this.mat === undefined && this.nom === undefined && this.prenom === undefined) {
        this.tabTrierChauffeur = this.tabChauffeur;
      }
    }
  }*/

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
