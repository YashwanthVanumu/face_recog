import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MarkleaveserviceService } from '../markleaveservice.service';

@Component({
  selector: 'app-regularize-attendance',
  templateUrl: './regularize-attendance.component.html',
  styleUrls: ['./regularize-attendance.component.css']
})
export class RegularizeAttendanceComponent {
  empName: string = history.state.data[0][2]
  empId: number = history.state.data[0][1]
  email: string = history.state.data[0][4]
  constructor(private router: Router,private markleaveService: MarkleaveserviceService){}
  ngOnInit(): void {
    console.log("state data value:",history.state.data)
    console.log("emp_name and emp_id values are : ",this.empName,this.empId)
  }
  details: boolean = false;
  showNotification() {
    this.details = true
    if (this.details == true)
    {
      const admindetails = document.getElementById('admin-details') as HTMLDivElement;
      admindetails.style.display = 'block';
    }

    const datajson = {
      emp_id: this.empId,
      emp_name:this.empName,
      status: "present",
      request_type: "Regularize attendance",
      approved_by: this.empName,
      manager: this.empName,
      email:this.email
    }
    this.markleaveService.addRequest(datajson).subscribe((response) =>{
      console.log("regularize attendance response is :",response)
    }
    )
  

  }
 hideNotification() {
   // Hide the notification box
   const admindetails = document.getElementById('admin-details') as HTMLDivElement;
   admindetails.style.display = 'none';
 }

}
