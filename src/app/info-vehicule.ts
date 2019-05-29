import { StatutVehiculeEnum } from './enum/statut-vehicule-enum.enum';

export class InfoVehicule {

  constructor(public id:number,
     public marque:string,
     public modele:string,
     public categorie:string,
     public immatriculation:string,
     public photoUrl,
      public nbPlaces:number,
      public statutVehicule: StatutVehiculeEnum ){

  }

}
