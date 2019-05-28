import { Vehicule } from './vehicule';
import { Chauffeur } from './models/Chauffeur';


export class ReservationVehicule {

  constructor( public dateDeReservation:string, public dateDeRetour:string, public uneVoiture:Vehicule, public avecOuSansChauffeur:boolean, public unChauffeur?:Chauffeur){}

}
