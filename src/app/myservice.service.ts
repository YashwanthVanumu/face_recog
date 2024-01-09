import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  private Url = 'http://127.0.0.1:5000/authenticate';
  private apiUrl = 'http://127.0.0.1:5000/admins'


  constructor(private http: HttpClient) { }

  // makeRequest() {
  //   const url = '/api/some_endpoint'; // Replace with the actual API endpoint
  //   const requestData = { key: 'value' };

  //   return this.http.post(url, requestData);
  // }

  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admins`);
  }

  getAdmin(adminId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admins/${adminId}`);
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admins`, adminData);
  }

  login(username: string, password: string): Observable<any>  {
    const body = { username, password }; //storing the unmae and password in the form of dictionary
    return this.http.post(this.Url, body,httpOptions);
}
}
