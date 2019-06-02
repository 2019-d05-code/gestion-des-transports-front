
import { Chauffeur } from './models/Chauffeur';
import { Vehicule } from './models/vehicule';


export class ReservationVehicule {

  constructor( public dateDeReservation:string, public dateDeRetour:string, public uneVoiture:Vehicule, public avecOuSansChauffeur:boolean, public unChauffeur?:Chauffeur){}

}
