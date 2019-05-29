import { Component, OnInit } from '@angular/core';
import { ReservationVehicule } from '../models/reservation-vehicule';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-lire-reservation',
  templateUrl: './lire-reservation.component.html',
  styleUrls: ['./lire-reservation.component.css']
})
export class LireReservationComponent implements OnInit {
  showed = false;
  listesReservations: ReservationVehicule[];
  enCours: string = "Mes Reservation en cours"
  historique: string = "Historique"
  maintenant: Date = new Date(Date.now());

  courant: Boolean = false;
  boolhist: Boolean = true;

  constructor(private srv: DataService) { }

  ngOnInit() {

  }
  montrerLesreservations() {
    this.showed = true;

    return this.srv.afficherLesReservation().subscribe(tab => {
      this.listesReservations = tab;
      this.listesReservations.forEach(element => {
        let madate = new Date(element.dateDeReservation)

        if (madate >= this.maintenant) {
          this.courant = true;
        } else if (madate < this.maintenant) {
          this.boolhist = false;
        }

      });
    })

  }
}
