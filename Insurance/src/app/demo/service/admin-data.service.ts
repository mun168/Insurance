import { Injectable,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


const USER_URLS = 'http://localhost:8080/api/admin'



@Injectable({
  providedIn: 'root'
})

// component for admin user

export class AdminDataService  implements OnInit{

 //get user id from localstorage 
  userId = localStorage.getItem("userId")


  constructor(private http: HttpClient,private storageService : StorageService){}

  ngOnInit(): void {
    
  }

  
  // method to save user applications by ID
  saveUserApplication (applicationData : any) : Observable<any>{
    
    return this.http.post(
      USER_URLS + "/" + this.userId + "/apply",applicationData,this.storageService.getHeader()

    )

  }

  //method to get users who have registered on the system
  getUsers () : Observable<any>{
    return this.http.get(
      USER_URLS + "/users" , this.storageService.getHeader()
    )
  }

  //method to get all insurance applications

  getAllApplications () : Observable<any>{
    return this.http.get(
        USER_URLS + "/applicants", this.storageService.getHeader()
    )
  }

  //method to get number of users 
  getTotalUsers() : Observable<any>{
    return this.http.get(
      'http://localhost:8080/api/v1/count',this.storageService.getHeader()
    )
  }

}