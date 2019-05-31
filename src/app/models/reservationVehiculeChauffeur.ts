import { Chauffeur } from './Chauffeur';

export class ReservationVehiculeChauffeur{
  constructor(
    public id:string | number,
    public dateDebut:Date,
    public dateFin:Date,
    public nomChauffeur?:string,
    public prenomChauffeur?:string,
    public idChauffeur?:number,
    public avecChauffeur?:boolean,
   ){}
}
