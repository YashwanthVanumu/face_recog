import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }
  private successMessageSubject = new Subject<string>();
  successMessageAction$ = this.successMessageSubject.asObservable();

  private errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  setSuccessMessage(message: string){
    this.successMessageSubject.next(message)
  }

  setErrorMessage(message: string){
    this.errorMessageSubject.next(message)
  }

  clearSuccessMessage(){
    this.setSuccessMessage('')
  }

  clearErrorMessage(){
    this.setErrorMessage('')
  }

  clearAllMessage(){
    this.clearSuccessMessage();
    this.clearErrorMessage();
  }
}
