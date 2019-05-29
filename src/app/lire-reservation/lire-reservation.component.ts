import { Component, OnInit } from '@angular/core';
import { ReservationVehicule } from '../models/reservation-vehicule';
import { DataService } from '../service/data.service';
import { Chauffeur } from '../models/Chauffeur';

@Component({
  selector: 'app-lire-reservation',
  templateUrl: './lire-reservation.component.html',
  styleUrls: ['./lire-reservation.component.css']
})
export class LireReservationComponent implements OnInit {
  showed=false;
  listesReservationsEnCours:ReservationVehicule[] = new Array();
  listesReservationsTerminee:ReservationVehicule[] =  new Array();
  enCours:string="Mes Reservation en cours"
  historique:string="Historique"
  maintenant:Date = new Date(Date.now());


  courant:Boolean = false;
  boolhist:Boolean = true;

  constructor(private srv:DataService) { }

  ngOnInit() {

 this.srv.afficherLesReservation().subscribe(tab =>tab.forEach(element => {
        let madate = new Date(element.dateDeRetour);
      if(madate>=this.maintenant){
        this.listesReservationsEnCours.push(element);
      }else{
        this.listesReservationsTerminee.push(element);
      }
    }));

  }



}
