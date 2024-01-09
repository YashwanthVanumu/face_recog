import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeserviceService } from '../employeeservice.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  girl_icon="../assets/girl-icon.png"
  boy_icon="../assets/user-icon.png"
  emp_name!: string;
  job!: string;
  emp_id!: number;
  json: any;
  email!: string;
  gender!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
    constructor(private router: Router,private employeeService: EmployeeserviceService) {
       
    }
  ngOnInit(): void {
    const employeeid = Number(this.route.snapshot.params['emp_id']);
    this.employeeService.getEmployeeById(employeeid).subscribe((response) => {
      this.emp_name = response.emp_name;
      this.job = response.job_position;
      this.gender = response.gender;
      this.emp_id = response.emp_id;
      this.email = response.email

    }
    )
  }
  // ngOnInit(): void {
  //   console.log("emp_id is : ",this.employeeid)
  // }
  onsave(){

  this.router.navigate(['/login']);
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
