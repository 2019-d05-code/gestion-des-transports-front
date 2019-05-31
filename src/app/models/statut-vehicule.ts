import { StatutVehiculeEnum } from '../enum/statut-vehicule-enum.enum';

export class StatutVehicule {
  constructor(
    public immatriculation: string,
    public statutVehicule: StatutVehiculeEnum
) {}
}
