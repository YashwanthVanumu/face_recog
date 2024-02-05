import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeserviceService } from '../employeeservice.service';
import { AttendanceService } from '../attendance.service';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HolidayService } from '../holiday.service';

@Component({
  selector: 'app-welcome-employee',
  templateUrl: './welcome-employee.component.html',
  styleUrls: ['./welcome-employee.component.css']
})
export class WelcomeEmployeeComponent implements OnInit {
  boy_icon="../assets/user-icon.png"
  username!: string
  user_id!: string
  emp_name!: string
  emp_id!: number
  email: string = history.state.data[4]
  employees: any = [];
  emp_date: number[] = [];
  emp_date_status: string[]= [];
formattedDay: number[]=[];
 formattedDate: number[]=[];
 formattedMonth: number[]=[];
 formattedYear: number[]=[];
 mysqldate: Date[]= [];
 users!: number;
 result!: [];
 holidays:  any= [];


  constructor(private router: Router,private employeeServie: EmployeeserviceService, private attendanceservice: AttendanceService, private cdr: ChangeDetectorRef, private holidayservice: HolidayService) {
    this.users = history.state.data[0]
    this.result = history.state.data
    console.log(this.users, this.result)
  
  }
  

   navigationExtras: NavigationExtras = {
    queryParams: { id: this.emp_id },
  };


  ngOnInit(): void {
    this.employeeServie.getEmployeeById(this.users).subscribe((data)=>{
      this.employees = data;
      console.log(this.employees)
      console.log(this.employees.emp_id)
      console.log(this.employees.emp_name)
      console.log(typeof this.employees.emp_id)
    })
     }

  // onsave2(){
  //   console.log("this is state data",this.users)
  //   this.router.navigate(['/attendance-calendar'], this.navigationExtras);
  // //this.router.navigate(['/notification']);
  // }
  onsave3(){
    this.router.navigate(['/mark-leave'],{state:{data:this.result}})
  }
  onsave4(){
    this.router.navigate(['/regularize-attendance'],{state:{data:this.result}})
  }
  showadmindetails(){
    // Show the notification box
    const admindetails = document.getElementById('admin-details') as HTMLDivElement;
    admindetails.style.display = 'block';

 }
 hideNotification() {
  // Hide the notification box
  const admindetails = document.getElementById('admin-details') as HTMLDivElement;
  admindetails.style.display = 'none';
}

onsave5(){

   forkJoin([this.holidayservice.get_holiday(),this.attendanceservice.get_attendance_by_id(this.users)]).subscribe(([holidaydata,attendanceresponse]) =>{

      // this.emp_name = data.emp_name
      // this.emp_id = data.emp_id
      // console.log(this.result)
      console.log("Holdiay response is:",holidaydata)
      this.holidays = holidaydata;
      console.log(this.holidays)
      for (let i=0; i<attendanceresponse.length;i++)
      {
        this.emp_date.push(attendanceresponse[i].date);
        this.emp_date_status.push(attendanceresponse[i].status);
      }
      
      console.log(this.emp_date);
      console.log(this.emp_date_status)
      console.log(typeof this.emp_date)
      for( let i=0; i<this.emp_date.length;i++)
      {
        this.mysqldate.push(new Date(this.emp_date[i]));
        console.log("populating mysql date",this.mysqldate[i])
        console.log(typeof this.mysqldate[i]);
      }
      for( let i=0; i<this.mysqldate.length;i++)
      {
        
        this.formattedDate.push(this.mysqldate[i].getDate());
        console.log("Getting the date from the mysqldate",this.formattedDate);
        this.formattedMonth.push(this.mysqldate[i].getMonth());
        
        this.formattedYear.push(this.mysqldate[i].getFullYear());
        this.formattedDay.push(this.mysqldate[i].getDay());
        
      }
      // this.attendancedetails.push(this.formattedDay, this.formattedDate, this.formattedMonth,this.formattedMonth)
      let attendancedetails ={
          key1: this.formattedDay,
          key2: this.formattedDate,
          key3: this.formattedMonth,
          key4: this.formattedYear,
          key5: this.employees.emp_name,
          key6: JSON.stringify(this.holidays),
      }
      console.log(this.formattedDate);
      console.log(this.formattedMonth);
      console.log(this.formattedYear);
      // if(this.dataloaded == true){
      //   this.beforeMonthViewRender({body: []})
      // }

      this.router.navigate(['/attendance-calendar'],{
        queryParams: attendancedetails
      })
      this.cdr.detectChanges();


    })

}
  

}
