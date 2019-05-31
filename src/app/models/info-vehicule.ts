import { StatutVehiculeEnum } from '../enum/statut-vehicule-enum.enum';
import { CategorieVehiculeEnum } from '../enum/categorie-vehicule-enum.enum';

export class InfoVehicule {

  constructor(
    public id: number,
    public marque: string,
    public modele: string,
    public categorie: CategorieVehiculeEnum,
    public immatriculation: string,
    public photoUrl,
    public nbPlaces: number,
    public statutVehicule: StatutVehiculeEnum
    ) {}

}
