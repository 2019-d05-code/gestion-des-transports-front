import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { InfoVehicule } from '../info-vehicule';
import { ReservationVehicule } from '../reservation-vehicule';
import { Vehicule } from '../vehicule';

@Component({
  selector: 'app-creation-reservation',
  templateUrl: './creation-reservation.component.html',
  styleUrls: ['./creation-reservation.component.css']
})
export class CreationReservationComponent implements OnInit {

  constructor(private _srv:DataService) { }

heures:string[] = new Array();
minutes:string[] = new Array();

dateDeReservation:Date = new Date();
t:string="T";
heureDeReservation:string;
minutesDeReservation:string;
secondes:string="00";
deuxPoints:string=":";
zero:string="0";

dateDeRetour:Date = new Date();
heureDeRetour:string;
minutesDeretour:string;
reservation:ReservationVehicule = new ReservationVehicule(undefined, undefined, undefined);



cur = new InfoVehicule(undefined,undefined,undefined,undefined,undefined,undefined, undefined);
listeVehicules:InfoVehicule[];

vehiculeAEnvoyer:Vehicule = new Vehicule(undefined,undefined, undefined, undefined, undefined, undefined);



  ngOnInit() {


  for (let i = 0; i < 24 ; i++) {
    let nbrArajouter;
    if(i<=9){
      nbrArajouter = "0"+i
    }else{
      nbrArajouter = i
    }
    this.heures.push(nbrArajouter);
  }

  for(let i=0; i<60; i++){

   let nbrArajouter;
    if(i<=9){
      nbrArajouter = "0"+i
    }else{
      nbrArajouter = i
    }
    this.minutes.push(nbrArajouter);
  }

this._srv.afficherInfo().subscribe(tab=>this.listeVehicules = tab);

  }



ajouterReservation(){
  this.reservation = new ReservationVehicule(
     `${this.dateDeReservation}${this.t}${this.heureDeReservation}${this.deuxPoints}${this.minutesDeReservation}${this.deuxPoints}${this.secondes}`,
    `${this.dateDeRetour}${this.t}${this.heureDeRetour}${this.deuxPoints}${this.minutesDeretour}${this.deuxPoints}${this.secondes}`, this.vehiculeAEnvoyer =
    new Vehicule(this.cur.id, this.cur.marque, this.cur.modele, undefined, this.cur.immatriculation));

 return this._srv.reservationAjouter(this.reservation).subscribe(res => { console.log(this.vehiculeAEnvoyer.id) }, err => {}, () => {
  alert('votre réservation a bien été sauvegardée, vous pouvez fermer cette fenêtre!')
})
}


}
