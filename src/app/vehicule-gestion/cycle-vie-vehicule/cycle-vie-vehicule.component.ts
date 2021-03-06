import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Vehicule } from '../../models/vehicule';
import { StatutVehicule } from 'src/app/models/statut-vehicule';
import { StatutVehiculeEnum } from 'src/app/enum/statut-vehicule-enum.enum';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-cycle-vie-vehicule',
  templateUrl: './cycle-vie-vehicule.component.html'
})
export class CycleVieVehiculeComponent implements OnInit {

  vehicule: Vehicule = new Vehicule('', '', undefined, '', '', undefined, undefined);
  immatriculation: string;
  statutVehicule: StatutVehicule = new StatutVehicule('', undefined);
  erreurMsgEntree: string;
  erreurMsgStatut: string;
  erreurMsgResa: string;
  serviceTF: Boolean = false;
  reparationTF: Boolean = false;
  hsTF: Boolean = false;
  listeReservations: Reservation[] = [];
  listeReservationAVenir: Reservation[] = [];
  listeReservationHistorique: Reservation[] = [];
  reservationEnCours: Reservation[]=[];
  headElements: string[] = [
    `Date/Heure de début`, `Date/Heure de fin`, `Responsable`
  ];
  maintenant:Date = new Date(Date.now());


  constructor(private _srv: DataService, private route: ActivatedRoute) {
    this.immatriculation = route.snapshot.paramMap.get('immatriculation');
  }

  ngOnInit() {

    //abonnement au changement de route avec réutilisation du composant par le router
    this.route.paramMap.subscribe((params: ParamMap) => {
      const immatriculation = params.get('immatriculation');
    });

    this._srv.choisirVehicule(this.immatriculation).subscribe(
      returnValue => {
        this.vehicule = returnValue;
        this.changerBoolean(returnValue.statutVehicule);
      },
      err => this.erreurMsgEntree = err
    );


    this._srv.afficherReservationsSrv().subscribe( tab => tab.forEach(element => {
    let date = new Date(element.dateDeReservation);
    let dateretour=new Date(element.dateDeRetour);
      if(date>this.maintenant){
        this.listeReservationAVenir.push(element);
      }else if(date==this.maintenant || dateretour>this.maintenant){
        this.reservationEnCours.push(element);
      }else if(dateretour<this.maintenant){
        this.listeReservationHistorique.push(element);
      }

    }),
      err => this.erreurMsgResa = err
    );

  }

  changerBoolean(stat: StatutVehiculeEnum) {
    if (stat === StatutVehiculeEnum.EN_SERVICE || stat === StatutVehiculeEnum.HORS_SERVICE) {
      this.reparationTF = true;
    } else { this.reparationTF = false; }
    if (stat === StatutVehiculeEnum.HORS_SERVICE || stat === StatutVehiculeEnum.EN_REPARATION) {
      this.serviceTF = true;
    } else { this.serviceTF = false; }
    if (stat === StatutVehiculeEnum.EN_SERVICE || stat === StatutVehiculeEnum.EN_REPARATION) {
      this.hsTF = true;
    } else { this.hsTF = false; }
  }

  changerStatutReparation() {
    this.statutVehicule.immatriculation = this.vehicule.immatriculation;
    this.statutVehicule.statutVehicule = StatutVehiculeEnum.EN_REPARATION;

    this._srv.changerStatutVehiculeSrv(this.statutVehicule).subscribe(
      returnValue => {
        this.vehicule.statutVehicule = returnValue.statutVehicule;
        this.changerBoolean(this.statutVehicule.statutVehicule);
      },
      err => this.erreurMsgStatut = err
    );
  }

  changerStatutService() {
    this.statutVehicule.immatriculation = this.vehicule.immatriculation;
    this.statutVehicule.statutVehicule = StatutVehiculeEnum.EN_SERVICE;

    this._srv.changerStatutVehiculeSrv(this.statutVehicule).subscribe(
      returnValue => {
        this.vehicule.statutVehicule = returnValue.statutVehicule;
        this.changerBoolean(returnValue.statutVehicule);
      },
      err => this.erreurMsgStatut = err
    );
  }

  changerStatutHS() {
    this.statutVehicule.immatriculation = this.vehicule.immatriculation;
    this.statutVehicule.statutVehicule = StatutVehiculeEnum.HORS_SERVICE;

    this._srv.changerStatutVehiculeSrv(this.statutVehicule).subscribe(
      returnValue => {
        this.vehicule.statutVehicule = returnValue.statutVehicule;
        this.changerBoolean(returnValue.statutVehicule);
        },
      err => this.erreurMsgStatut = err
    );
  }

}
