import { StatutVehiculeEnum } from '../enum/statut-vehicule-enum.enum';

export class Vehicule {

  constructor (
    public marque: string,
    public modele: string,
    public categorie: string[],
    public immatriculation: string,
    public photoUrl: string,
    public nbPlaces: number,
    public statutVehicule: StatutVehiculeEnum,
    public id?: number
  ) {}

}
