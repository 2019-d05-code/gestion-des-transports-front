import { Component, OnInit } from '@angular/core';
import {Collegue} from "./auth.domains";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { collectExternalReferences } from '@angular/compiler';

/**
 * Formulaire d'authentification.
 */
@Component({
  selector: 'app-auth',
  templateUrl: `auth.components.html`,
  styles: []
})
export class AuthComponent implements OnInit {

  afficheProfil: string;
  collegueConnecte:Observable<Collegue>;
  collegue:Collegue = new Collegue({});
  err:boolean;

  constructor(private _authSrv:AuthService, private _router:Router) { }

  ngOnInit() {
    this.collegueConnecte = this._authSrv.collegueConnecteObs;
  }

  connecter() {
    this._authSrv.connecter(this.collegue.email, this.collegue.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page /tech
        col => {
          if(col.roles.includes("ROLE_ADMINISTRATEUR")){
            this.afficheProfil = "admin";
          }else if(col.roles.includes("ROLE_CHAUFFEUR")){
            this.afficheProfil = "chauffeur"
          }else{
            this._router.navigate(['/collaborateur/accueil'])
          }
              },


        // en cas d'erreur, affichage d'un message d'erreur
        err =>this.err = true
      );
  }

}
