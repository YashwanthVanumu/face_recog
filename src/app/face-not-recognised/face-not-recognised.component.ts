import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-face-not-recognised',
  templateUrl: './face-not-recognised.component.html',
  styleUrls: ['./face-not-recognised.component.css']
})
export class FaceNotRecognisedComponent implements OnInit {
  image="../assets/astreya-logo-white.svg"
  img1="../assets/face_not_recognised.png"
  cameraStream!: MediaStream;
  constructor(private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/attendance'])
    }, 4000);
  }
  onsave(){

    this.router.navigate(['/popup']);
    }


}
