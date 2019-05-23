import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/Annonce';

@Component({
  selector: 'app-annonce-creation-covoiturage',
  templateUrl: './annonce.creation.covoiturage.component.html',
  styles: []
})
export class AnnonceCreationCovoiturageComponent implements OnInit {

  private _annonce:Annonce;
  get annonce() {
    return this._annonce;
  }
  set annonce(annonce: Annonce) {
    this._annonce = annonce;
  }

  constructor() { }

  ngOnInit() {
  }

}
