import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addHours, startOfDay, endOfDay, setHours } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { DataService } from '../service/data.service';
import { ReservationVehicule } from '../models/reservation-vehicule';
import { map} from 'rxjs/operators';
import { ReservationChauffeur } from '../models/ReservationChauffeur';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-planning',
  templateUrl: `planning.component.html`,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class PlanningComponent implements OnInit {

  reservation:ReservationChauffeur;
  listesReservations:ReservationVehicule[]
  idChauffeur:number;
  locale: string = 'fr';

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;
  collegueConnecte:Observable<Collegue>;
  email:string;
  nomChauffeur:string;
  statut : string = "";
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: Observable<CalendarEvent[]>;

  constructor(private _serv : DataService, private modal: NgbModal, private _authSrv:AuthService) { }


  ngOnInit() {
    this._authSrv.verifierAuthentification().subscribe(col => {this.idChauffeur = col.id; this.nomChauffeur = col.nom});
      this._serv.afficherLesReservationavecChauffeur().subscribe();
     this.events = this._serv.afficherLesReservationavecChauffeur()
    .pipe(map(
       listeRes => listeRes.filter(res => res.avecChauffeur == true).map( res => {
        let couleur = colors.yellow;
        if (res.nomChauffeur == "") { couleur = colors.red; this.statut = "Accepter la demande"}
        else if(res.nomChauffeur == this.nomChauffeur){ couleur = colors.blue;this.statut = "Accepté"}
        else { couleur = colors.yellow}

          return <CalendarEvent> {
            start: setHours(new Date(res.dateDebut),new Date(res.dateDebut).getHours()+1),
            end: setHours(new Date(res.dateFin),new Date(res.dateFin).getHours()+1),
            title: `${new Date(res.dateDebut).getHours()} - ${new Date(res.dateFin).getHours()} </br> Responsable : ${res.nomChauffeur}-${res.prenomChauffeur} </br> Telephone : ${res.telephone} </br> Immatriculation : ${res.immatriculation} </br> <B>${this.statut}<B> `,
            meta: res.id,
            color: couleur,
        }
    })));

  }

  eventClicked({ event }: { event: CalendarEvent }): void {

    this.reservation = new ReservationChauffeur(event.meta,this.idChauffeur);
    this._serv.ajoutChauffeurAReservation(this.reservation).subscribe();
    this.ngOnInit();
  }

}
