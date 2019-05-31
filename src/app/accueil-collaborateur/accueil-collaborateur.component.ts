import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil-collaborateur',
  templateUrl: './accueil-collaborateur.component.html'
})
export class AccueilCollaborateurComponent implements OnInit {

  collaborateur:Observable<Collegue>;
  constructor(private _authSrv:AuthService) { }

  ngOnInit() {

    this.collaborateur = this._authSrv.collegueConnecteObs;

  }

}
