import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../employeeservice.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  users: number[] =[];
  arr: number[] = [];
  logo="../assets/astreya-logo.jpeg"
  username : string = '';
  password : string = '';
  constructor(private router: Router,private employeeService: EmployeeserviceService) {}
  onsave(){

    this.employeeService.login(this.username,this.password).subscribe((response) => {
      this.users= response
      console.log(response)
      this.arr = this.users.map(Number)
      console.log(this.users)
      this.router.navigate(['/welcome-employee'],{state:{data:this.users}});


    },)
    }

}
