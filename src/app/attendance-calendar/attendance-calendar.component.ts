import { ChangeDetectionStrategy, Component, Injectable, OnInit, ViewEncapsulation, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { Observable, Subject, defer, forkJoin, race, tap, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventColor } from 'calendar-utils';
import { startOfYear, subYears } from 'date-fns';
import { EmployeeserviceService } from '../employeeservice.service';
import { ChangeDetectorRef } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { DatePipe } from '@angular/common';
import { HolidayService } from '../holiday.service';

// const RED_CELL: 'red-cell' = 'red-cell';
// const BLUE_CELL: 'blue-cell' = 'blue-cell';


@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}


// const colors: Record<string, EventColor> = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };

// interface Film {
//   id: number;
//   title: string;
//   release_date: string;
// }

@Component({
  selector: 'app-attendance-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css'],
  providers: [
    DatePipe,
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
      
    },
  ],
})

export class AttendanceCalendarComponent implements OnInit{
  boy_icon="../assets/user-icon.png";
  details: boolean = false;
  // view: CalendarView = CalendarView.Month;

  // viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
// refresh!: Subject<any>;
  refresh = new Subject<void>();

  // cssClass: string = RED_CELL;
  username!: string;
  user_id!: string;
  emp_name!: string;
  emp_id!: number;
  // email: string = history.state.data[4];
  emp_date: number[] = [];
  emp_date_status: string[]= [];
formattedDay: number[]=[];
 formattedDate: number[]=[];
 formattedMonth: number[]=[];
 formattedYear: number[]=[];
 employeeid = -1;
 route: ActivatedRoute = inject(ActivatedRoute);
 daydetails: any[] = [];
 holidays: any = [];
 holidaydetails: any = [];


private getHardcodedHolidays(): CalendarEvent[] {
  // Hardcoded list of public holidays (example)
  const holidaysdate: CalendarEvent[] = [];
  for (let i = 0; i < this.holidaydetails.length; i++) {
    console.log(typeof this.holidaydetails[i].date)
    holidaysdate.push({
      start: new Date(this.holidaydetails[i].date),
      title: this.holidaydetails[i].title,
      // allDay: true,
      // meta: { type: 'public-holiday' },
    });
  }
  return holidaysdate;
}
   
    // {
    //   start: new Date('2023-07-04'),
    //   title: 'Independence Day',
    //   // allDay: true,
    //   // meta: { type: 'public-holiday' },
    // },
    // {
    //   start: new Date('2023-12-25'),
    //   title: 'Christmas',
    //   // allDay: true,
    //   // meta: { type: 'public-holiday' },
    // },
    // {
    //   start: new Date('2023-11-12'),
    //   title: 'diwali',
    //   // allDay: true,
    //   // meta: { type: 'public-holiday' },
    // },
    // {
    //   start: new Date('2024-01-01'),
    //   title: 'New Year\'s Day',
    //   // allDay: true,
    //   // meta: { type: 'public-holiday' },
    // },
    // Add more holidays as needed

  


  // events$!: Observable<CalendarEvent<{ film: Film; }>[]>;

  // activeDayIsOpen: boolean = false;

  constructor(private router: Router, private employeeServie: EmployeeserviceService, private attendanceservice: AttendanceService, private cdr: ChangeDetectorRef, private holidayservice: HolidayService, private datepipe: DatePipe ) {
   
    
  }
  // users: number = history.state.data[0][1];
 
  // result: [] = history.state.data;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.formattedDay = params['key1'];
      this.formattedDate = params['key2'];
      this.formattedMonth = params['key3'];
      this.formattedYear = params['key4'];
      this.emp_name = params['key5'];
      this.holidays = JSON.parse(params['key6']);
      // Access more parameters as needed
      console.log('Received data:', this.formattedDay, this.formattedDate, this.formattedMonth, this.formattedYear, this.emp_id, this.holidays);
    });
    this.holidaydetails = this.formatAndModifyDates(this.holidays);
    console.log(this.holidaydetails);
    this.events = this.getHardcodedHolidays();
    console.log(this.events)
   
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      const dayOfMonth = day.date.getDate();
      console.log(dayOfMonth);
       console.log(day.date.getMonth());
       console.log(day.date.getFullYear());
       console.log("in before month render", this.formattedDate.length);
      for(let i=0; i<this.formattedDate.length;i++)
      {
        console.log("in before month render colour logic");
        console.log(this.formattedDate[i], this.formattedDay[i], this.formattedMonth[i], this.formattedYear[i])
        console.log(dayOfMonth);

        if (dayOfMonth == this.formattedDate[i] && day.date.getMonth() == this.formattedMonth[i] && day.date.getFullYear() == this.formattedYear[i] && day.date.getDay() !== 0 && day.date.getDay() !== 6) {
          day.cssClass = 'bg-green';
        }
      }
     
      
    });
   
  }
  
  onsave2(){

    this.router.navigate(['/login']);
    }
    showNotification() {
      this.details = !this.details
      if (this.details == true)
      {
        const admindetails = document.getElementById('admin-details') as HTMLDivElement;
        admindetails.style.display = 'block';
      }
      else{
        this.hideNotification();
      }
  
    }
 hideNotification() {
   // Hide the notification box
   const admindetails = document.getElementById('admin-details') as HTMLDivElement;
   admindetails.style.display = 'none';
 }
 
 formatAndModifyDates(originalData: any[]): any[] {
  return originalData.map(item => {
    // Clone the original object to avoid modifying it directly
    const newItem = { ...item };
    console.log(newItem)

    // Check if the item has a 'date' property
    if (newItem.date) {
      // Parse the original date

      // Use DatePipe to format the date in the desired format
      // newItem.date = this.datepipe.transform(newItem.date, 'yyyy-MM-dd');
      const [year, day, month] = newItem.date.split('-');

    // Create a new date string with the desired format
    newItem.date = `${year}-${month}-${day}`;
      console.log(newItem.date);
    }

    return newItem;
  });
}






}
