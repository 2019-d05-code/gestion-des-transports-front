import { Vehicule } from './vehicule';
import { InfoVehicule } from './info-vehicule';

export class ReservationVehicule {

  constructor(public vehicule:InfoVehicule, public dateDeReservation:string, public dateDeRetour:string ){}
}
