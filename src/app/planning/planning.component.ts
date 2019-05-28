import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DAYS_OF_WEEK, CalendarDateFormatter } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addHours, startOfDay, endOfDay, setHours } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { DataService } from '../service/data.service';
import { ReservationVehicule } from '../reservation-vehicule';
import { map} from 'rxjs/operators';
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

  listesReservations:ReservationVehicule[]

  locale: string = 'fr';

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();




  events: Observable<CalendarEvent[]>;


  constructor(private _serv : DataService, private modal: NgbModal) { }


  ngOnInit() {

     this.events = this._serv.afficherLesReservation()
    .pipe(map(

      listeRes => listeRes.map( res => {
        if(res. == true){
          let couleur = colors.blue;
          console.log(new Date(res.dateDeRetour.split("T")[0]))
          return <CalendarEvent> {
            //start: addHours(startOfDay(new Date(res.dateDeReservation)), parseInt(res.dateDeReservation.split("T")[1])+1),
           //end: addHours(endOfDay(new Date(res.dateDeRetour.split("T")[0])),parseInt(res.dateDeRetour.split("T")[1])+1),
            start: setHours(new Date(res.dateDeReservation), parseInt(res.dateDeReservation.split("T")[1])+1),
            end: setHours(new Date(res.dateDeRetour),parseInt(res.dateDeRetour.split("T")[1])+1),
            title: `${res.dateDeReservation.split("T")[1]}-${res.dateDeRetour.split("T")[1]}`,
            color: couleur,
        }
      }
    })));
  }


  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

}
