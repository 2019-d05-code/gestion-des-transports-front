import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addHours, startOfDay, endOfDay, setHours } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { DataService } from '../service/data.service';
import { ReservationVehicule } from '../models/reservation-vehicule';
import { map} from 'rxjs/operators';
import { reservationVehiculeChauffeur } from '../models/reservationVehiculeChauffeur';
registerLocaleData(localeEs);

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `planning.component.html`,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class PlanningComponent implements OnInit {

  reservation:reservationVehiculeChauffeur;
  listesReservations:ReservationVehicule[]

  locale: string = 'fr';

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();
  events: Observable<CalendarEvent[]>;

  constructor(private _serv : DataService, private modal: NgbModal) { }


  ngOnInit() {

     this.events = this._serv.afficherLesReservationavecChauffeur()
    .pipe(map(

      listeRes => listeRes.filter(res => res.avecOuSansChauffeur == true).map( res => {
        console.log(res.id)
          return <CalendarEvent> {
            start: setHours(new Date(res.dateDeReservation),new Date(res.dateDeReservation).getHours()),
            end: setHours(new Date(res.dateDeRetour),new Date(res.dateDeRetour).getHours()),
            title: `${new Date(res.dateDeReservation).getHours()} - ${new Date(res.dateDeRetour).getHours()} `,
            meta: `${res.avecOuSansChauffeur}`
        }
    })));
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log(event)
    //this.reservation = new reservationVehiculeChauffeur(event.id, event.start,event.end);

  }

}
