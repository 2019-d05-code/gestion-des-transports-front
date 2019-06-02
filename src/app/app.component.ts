import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Collegue } from "./auth/auth.domains";

/**
 * Composant principal de l'application.
 */
@Component({
  selector: 'app-root',
  template: `
    <div class="card card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg);">
      <h1 class="text-white text-center h1 h1-responsive">Gestion Des Transports</h1>
      <div *ngIf="!(collegueConnecte | async).estAnonyme()">
      <br />
      <div class="text-right">
        <h4 class="text-white">{{(collegueConnecte | async).nom}} {{(collegueConnecte | async).prenom}}</h4>
        <img src="{{(collegueConnecte | async).photoUrl}}" class="border border-warning rounded-circle" weight="80px" height="80px" />
      </div>
      <br />
      <div class="text-right">
        <button routerLink="/connexion" mdbBtn type="button" color="danger" (click)="seDeconnecter()" mdbWavesEffect>Se déconnecter</button>
      </div>
      </div>
    </div>
    <br />
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  href: string;
  constructor(private _authSrv: AuthService, private _router: Router) {

  }

  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this._authSrv.seDeconnecter().subscribe(
      value => this._router.navigate(['/auth'])
    );
  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {

    this.collegueConnecte = this._authSrv.collegueConnecteObs;
  }

}
