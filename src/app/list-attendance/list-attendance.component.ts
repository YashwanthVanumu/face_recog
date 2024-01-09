import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.css']
})
export class ListAttendanceComponent implements OnInit{
  boy_icon="../assets/user-icon.png"
  details: boolean = false;

  attendances: any[] =[]

  constructor(private router: Router, private attendanceService: AttendanceService) {}
  ngOnInit(): void {
    this.attendanceService.get_attendance().subscribe((response) =>{
    this.attendances = response;
    console.log(response)

    })}
  onsave(){

  this.router.navigate(['/calendar-details']);
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

}
