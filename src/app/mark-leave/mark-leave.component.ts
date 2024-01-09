import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MarkleaveserviceService } from '../markleaveservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeserviceService } from '../employeeservice.service';
import { DialogService } from '../dialog.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-mark-leave',
  templateUrl: './mark-leave.component.html',
  styleUrls: ['./mark-leave.component.css']
})
export class MarkLeaveComponent implements OnInit {
  empId: number = history.state.data[0][1];
  empName: string = history.state.data[0][2];
  email: string = history.state.data[0][4];
  startDate!: string;
  successMessage$ = this.dialogService.successMessageAction$;
  errorMessage$ = this.dialogService.errorMessageAction$;
  endDate!: string;
  leaveForm: FormGroup;
  selectedLevel!: any;

  data = [
    { id: 0, name: "Casual leave" },
    { id: 1, name: "Sick leave" }
  ];

  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private markleaveService: MarkleaveserviceService,
    private employeeService: EmployeeserviceService,
    private dialogService: DialogService
  ) {
    this.leaveForm = this.fb.group({

      date_from: ['', Validators.required],
      date_to: [''],
      request_type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("State variable value is: ", history.state.data);
  }

  onsave(): void {
    if (this.empId && this.empName) {
      const formData = this.leaveForm.value;
      const result = this.selectedLevel;
      console.log("Reason for the leave", result);

      const datajson = {
        emp_id: this.empId,
        approved_by: this.empName,
        emp_name: this.empName,
        date_from: this.startDate,
        date_to: this.endDate,
        request_type: this.selectedLevel.name,
        email: this.email,
        manager: this.empName
      };

      this.markleaveService.addRequest(datajson).pipe(
        tap((value) => {
          this.dialogService.setSuccessMessage(value.message);
          console.log('Request added successfully:', value);
          const responseDataWithRequestType = {
            request_type: this.selectedLevel
          };
          console.log('Response with Request Type:', responseDataWithRequestType);
        })
      ).subscribe();
    }
  }
}
