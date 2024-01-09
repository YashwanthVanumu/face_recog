import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-date',
  templateUrl: './pick-date.component.html',
  styleUrls: ['./pick-date.component.css']
})
export class PickDateComponent {
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  selectedLevel!: string;
  
  data = [
      {id: 0, name: "Casual leave"},
      {id: 1, name: "Sick leave"}
  ];
  // datajson = JSON.stringify(this.data)
  minDate: string = new Date().toISOString().split('T')[0];
  constructor(private router: Router) {}
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

}
