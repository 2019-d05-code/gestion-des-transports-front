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
  p: number = 1;

  courant:Boolean = false;
  boolhist:Boolean = true;

  constructor(private srv:DataService) { }

  ngOnInit() {

 this.srv.afficherLesReservation().subscribe(tab =>tab.forEach(element => {
        let madate = new Date(element.dateDeRetour);
        let autreDate= new Date(element.dateDeReservation)
      if(autreDate>=this.maintenant || madate>this.maintenant){
        this.listesReservationsEnCours.push(element);
      }
      else if(autreDate<this.maintenant){
        this.listesReservationsTerminee.push(element);
      }
    }));

  }



}
