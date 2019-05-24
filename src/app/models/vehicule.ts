import { StatutVehiculeEnum } from '../enum/statut-vehicule-enum.enum';
import { CategorieVehiculeEnum } from '../enum/categorie-vehicule-enum.enum';

export class Vehicule {

  constructor (
    public marque: string,
    public modele: string,
    public categorie: CategorieVehiculeEnum,
    public immatriculation: string,
    public photoUrl: string,
    public nbPlaces: number,
    public statutVehicule: StatutVehiculeEnum
  ) {}

}
