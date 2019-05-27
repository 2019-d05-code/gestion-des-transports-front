import { Vehicule } from './vehicule';

export class Reservation {

  constructor(
    public vehicule: Vehicule,
    public dateDeReservation: string,
    public dateDeRetour: string
  ) {}

}
