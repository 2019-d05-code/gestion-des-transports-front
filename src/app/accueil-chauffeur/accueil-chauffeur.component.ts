import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil-chauffeur',
  templateUrl: './accueil-chauffeur.component.html'
})
export class AccueilChauffeurComponent implements OnInit {

  chauffeur:Observable<Collegue>;
  constructor(private _authSrv:AuthService) { }

  ngOnInit() {

    this.chauffeur = this._authSrv.collegueConnecteObs;

  }

}
