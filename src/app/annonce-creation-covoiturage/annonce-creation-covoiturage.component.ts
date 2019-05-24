import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/Annonce';
import { Time } from '@angular/common';

@Component({
  selector: 'app-annonce-creation-covoiturage',
  templateUrl: './annonce.creation.covoiturage.component.html',
  styleUrls: ['./annonce.creation.covoiturage.component.css']
})
export class AnnonceCreationCovoiturageComponent implements OnInit {

  private _annonce: Annonce;
  get annonce() {
    return this._annonce;
  }
  set annonce(annonce: Annonce) {
    this._annonce = annonce;
  }

  public testRecupHeure: number;

  constructor() {
    this._annonce = new Annonce();
  }

  ngOnInit() {
  }

  public publierAnnonce() {
    console.log(`annonce: ${this._annonce.dateTimeDepart}`);
    console.log(`testRecupHeure: ${this.testRecupHeure}`);
    console.log(`testRecupHeure: ${this.testRecupHeure}`);

  }

}
