import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FaceNotRecognisedComponent } from './face-not-recognised/face-not-recognised.component';
import { FaceRecognisedComponent } from './face-recognised/face-recognised.component';
import { PopupComponent } from './popup/popup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';

import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { WelcomeEmployeeComponent } from './welcome-employee/welcome-employee.component';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular';

import { SentRequestComponent } from './sent-request/sent-request.component';
import { RegularizeAttendanceComponent } from './regularize-attendance/regularize-attendance.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { PickDateComponent } from './pick-date/pick-date.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { DemoUtilsComponent } from './demo-utils/demo-utils.component';
import { MatIconModule } from '@angular/material/icon';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { MarkAttendanceFormComponent } from './mark-attendance-form/mark-attendance-form.component';
import { MarkLeaveComponent } from './mark-leave/mark-leave.component';






@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    FaceNotRecognisedComponent,
    FaceRecognisedComponent,
    PopupComponent,
    LoginComponent,
    UserComponent,
    DetailsComponent,
    AddUserComponent,
    WelcomeAdminComponent,
    NotificationComponent,
    ListAttendanceComponent,
    
    CalendarDetailsComponent,
          EmployeeLoginComponent,
          WelcomeEmployeeComponent,
          AttendanceCalendarComponent,
          
          SentRequestComponent,
                      RegularizeAttendanceComponent,
                      AttendanceManagementComponent,
                      PickDateComponent,
                      ContactComponent,
                      DemoUtilsComponent,
                      ThankYouComponent,
                      MarkAttendanceFormComponent,
                      MarkLeaveComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    CalendarCommonModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
