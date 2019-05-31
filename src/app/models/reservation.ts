import { Vehicule } from './vehicule';

export class Reservation {

  constructor(
    public dateDeReservation: string,
    public dateDeRetour: string,
    public vehicule?: Vehicule
  ) {}

}
