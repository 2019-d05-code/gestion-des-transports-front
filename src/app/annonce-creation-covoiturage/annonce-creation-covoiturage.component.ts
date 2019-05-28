import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/Annonce';
import { DataService } from '../service/data.service';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../auth/auth.domains';

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

  public strDateDepart: string;
  public strHeureDepart: string;
  public strMinutesDepart: string;
  public msgErreur: string;
  public msgSucces: string;
  public collegueConnecte: Collegue;

  constructor(private _dataService: DataService, private _authService: AuthService) {
    this._annonce = new Annonce();
  }

  ngOnInit() {
    this._authService.verifierAuthentification().subscribe(
      colConnecte => {
        this.collegueConnecte = colConnecte;
        this._annonce.annonceurEmail = colConnecte.email;
      },
      (err) => {},
      () => console.log("est co " + this.collegueConnecte.email)
    );
  }

  public publierAnnonce() {
    this.strDateDepart = `${this.strDateDepart}T${this.strHeureDepart}:${this.strMinutesDepart}`;
    this._annonce.dateTimeDepart = new Date(this.strDateDepart);
    this._dataService.creerAnnonce(this._annonce).subscribe(
      annonceCreee => {
        this.annonce = annonceCreee;
        this.msgSucces = 'Votre annonce de covoiturage a bien été enregistrée!';
      },
      (err: Error) => this.msgErreur = `Une erreur ${err.name} est arrivée pendant la création de l'annonce: ${err.message}.`
    );
  }

}
