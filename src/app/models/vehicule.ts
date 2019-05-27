export class Vehicule {
  constructor (public id:number,
    public marque: string,
    public modele: string,
    public categorie: string,
    public immatriculation: string,
    public photoUrl?: string
  ) {}
}
