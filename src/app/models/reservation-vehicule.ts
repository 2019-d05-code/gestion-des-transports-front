import { Vehicule } from './vehicule';


export class ReservationVehicule {

  constructor(
    public dateDeReservation:string,
    public dateDeRetour:string,
    public uneVoiture:Vehicule){}
}
