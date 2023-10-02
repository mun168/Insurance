import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const   AUTH_URL  = "http://localhost:8080/api/v1";


// headers declarations
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


//auth service to handle user register and login
export class AuthService {
  constructor(private http:HttpClient){}


  login(email:string,password:string):Observable<any>{
    return this.http.post(
        AUTH_URL + '/login',{
          email,
          password
        },
        httpOptions
    );
  }

  register(username:string,email:string,password:string) : Observable<any> {
    return this.http.post(
      AUTH_URL + '/register',{
        username,
        email,
        password
      },
      httpOptions
    );
  }
  

}