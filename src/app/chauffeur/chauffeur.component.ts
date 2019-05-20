import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Chauffeur } from '../models/chauffeur';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.components.html',
  styles: []
})
export class ChauffeurComponent implements OnInit{

  message: string;
  chauffeur = new Chauffeur(undefined, undefined, undefined);

  constructor(private _serv : DataService) {
   }

  ngOnInit() {
  }

  ajoutChauffeur(){

  }

  submit(){
    this._serv.ajoutChauffeur(this.chauffeur).subscribe(() => {},
    err => this.message = ` Erreur lors de l'ajout du collegue : ${err.error}`);
  }


}
