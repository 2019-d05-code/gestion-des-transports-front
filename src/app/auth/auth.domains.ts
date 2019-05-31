/**
 * Collègue utilisateur de l'application.
 */
export class Collegue {
  nom:string;
  prenom:string;
  email:string;
  motDePasse:string;
  roles:string[];
  id:number

  constructor(params:any) {
    Object.assign(this, params);
  }

  estAnonyme():boolean {
    return this.email == undefined;
  }

}
