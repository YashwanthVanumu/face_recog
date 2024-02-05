import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { th, tr } from 'date-fns/locale';

@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.css']
})
export class ShowimageComponent implements OnInit {
  @ViewChild('message1', { static: false }) paragraphContentRef!: ElementRef;
  @ViewChild('message2', { static: false }) paragraphContent!: ElementRef;
  formdata: any;
  // img="../assets/uploads/captured_image.jpg";
  emp_id: any;
  message: any;
  access: boolean = false;
  allow: boolean = false;
  message1: any;
  message2:any;
  constructor(private attendanceservice: AttendanceService, private router: Router, private platform: Platform) {}
  ngOnInit(): void {
    this.attendanceservice.recognize(this.formdata).subscribe(
      (response) => {
        console.log("Response of attendance service:", response);
        if (response.message === "Employee not found") {
          console.log("Inside employee not found");
          console.log(response.emp_id)
          this.emp_id = response.emp_id;
          this.message = response.message;
          this.message1 = 'Hi '+ this.emp_id + ', Access denied';
          this.Speakmessage(this.message1);
          this.access = true;
          setTimeout(()=>{
            this.router.navigate(['/face-not-recognised']);
          }, 5000);
          
        } else {
          this.emp_id = response.emp_id;
          this.message = response.message;
          this.message2 = 'Hi '+ this.emp_id + this.message;
          this.Speakmessage(this.message2)
          this.allow = true;
          setTimeout(()=>{
            this.router.navigate(['/face-recognised']);
          }, 5000);
          
        }
  
      },
      (error) => {
        console.error('Error sending image to the backend:', error);
      }
    );
  }
//   ngAfterViewInit(){
//     setTimeout(()=>{
      
//     }, 5000)
   


// }
Speakmessage(message: any): void {
  // Access the text content using nativeElement.textContent
  // const paragraphText = this.paragraphContentRef.nativeElement.innerHTML;
  // console.log('Text inside <p>:', paragraphText);
  if (this.platform.isBrowser) {
    const speech = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = speech[2];
    window.speechSynthesis.speak(utterance);
  }
}

}
