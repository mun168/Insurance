import { Injectable,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


const USER_URLS = 'http://localhost:8080/api/applicant'



@Injectable({
  providedIn: 'root'
})


//user data service to handle user request
export class UserDataService  implements OnInit{

 //get user id from localstorage
  userId = localStorage.getItem("userId")


  constructor(private http: HttpClient,private storageService : StorageService){}

  ngOnInit(): void {
    
  }

  
  //save user insurance applications
  saveUserApplication (applicationData : any) : Observable<any>{
    
    return this.http.post(
      USER_URLS + "/" + this.userId + "/apply",applicationData,this.storageService.getHeader()

    )



  }

  //get user application by id

  getApplications () : Observable<any>{
    return this.http.get(
      USER_URLS + "/" + this.userId + "/applications",this.storageService.getHeader()
    )
  }
  //get users

  getUsers () : Observable<any>{
    return this.http.get(
      USER_URLS + "/admin/users"
    )
  }
   

}