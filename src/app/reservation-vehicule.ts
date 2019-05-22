import { Vehicule } from './vehicule';
import { InfoVehicule } from './info-vehicule';

export class ReservationVehicule {

  constructor(public dateDeReservation:string, public dateDeRetour:string, public id_vehicule:InfoVehicule ){}
}
