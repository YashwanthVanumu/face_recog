import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-mark-attendance-form',
  templateUrl: './mark-attendance-form.component.html',
  styleUrls: ['./mark-attendance-form.component.css']
})
export class MarkAttendanceFormComponent {
  username!: string;
  userId!: number;
  message: string = '';
  details: boolean = false;
  successMessage$ = this.dialogService.successMessageAction$;
  errorMessage$ = this.dialogService.errorMessageAction$
  constructor(private router: Router, private attendanceService: AttendanceService,
    private dialogService: DialogService) {}
  onSubmit(){
    this.details = true;

    // Check if 'details' is true

    const jsonData = {
      "emp_id": this.userId,
      "emp_name": this.username
    }
    this.attendanceService.post_attendance(jsonData).pipe(
      tap(response =>{
      this.dialogService.setSuccessMessage(response.message);

      if (this.details == true) {
        // Get the admin-details element and set its display style to 'block'
        const message = document.getElementById('message') as HTMLDivElement | null;
        if (message) {
          message.style.display = 'block';
        }
      }
      console.log("response is :",response)
    this.message = response.message
  console.log(response.message)

  this.router.navigate(['/attendance']);

  })).subscribe()}




    //this.router.navigate(['/attendance']);

    onsave1(){

      this.router.navigate(['/face-recognised']);
      }

}
