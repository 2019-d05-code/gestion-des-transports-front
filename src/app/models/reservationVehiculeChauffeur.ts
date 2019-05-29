export class reservationVehiculeChauffeur{
  constructor(
    public id:number,
    public dateDeReservation:Date,
    public  dateDeRetour:Date,
    public avecOuSansChauffeur?:boolean){}
}
