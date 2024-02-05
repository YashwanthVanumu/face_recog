import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-recognised',
  templateUrl: './face-recognised.component.html',
  styleUrls: ['./face-recognised.component.css']
})
export class FaceRecognisedComponent {
  mage="../assets/astreya-logo-white.svg"

  img="../assets/face_recognised.jpg"
  message: string = history.state.data;
  constructor(private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/attendance']);
    }, 5000);

  }
  onsave(){

  this.router.navigate(['/face-not-recognised']);
  }
  onsave1(){

    this.router.navigate(['/employee-login']);
    }

 
}

