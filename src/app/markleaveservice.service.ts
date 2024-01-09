import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MarkleaveserviceService {
  private apiUrl = 'http://localhost:5000/request'; // Update with your Flask API URL

  constructor(private http: HttpClient) {}

  addRequest(requestData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(this.apiUrl,requestData);
  }
  getRequest(): Observable<any> {

    return this.http.get<any>(this.apiUrl)
  }
  singleRequest(request_id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${request_id}`)
  }
  deleteRequest(request_id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${request_id}`)
  }
}
