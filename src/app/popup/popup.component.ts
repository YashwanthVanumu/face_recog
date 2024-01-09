import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  image="../assets/astreya-logo-white.svg"
 
  constructor(private router: Router) {}
  onsave(){

    this.router.navigate(['/sent-request']);
    }
    onsave1(){
  
      this.router.navigate(['/attendance']);
      }

 
 

}


