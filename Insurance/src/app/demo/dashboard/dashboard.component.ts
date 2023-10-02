import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import  {AdminDataService}  from '../service/admin-data.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})

//dashboard component for statistics
export default class DashboardComponent implements OnInit {

  constructor(private http:HttpClient,private adminService : AdminDataService){}
  count : any;
  totalApplications: any;
  data : any[] = [];
  percentile = 100;


  ngOnInit() {
    this.adminService.getAllApplications().subscribe({
      next : (data) => {
        console.log(data)
        if (data.length > 5) {
          // Retrieve the last five recent application
          this.data = data.slice(-5);
        }else{
          this.data = data;
        }
      
      }
    })

    this.count = this.getTotalUsers()
    this.totalApplications = this.getTotalApplications()
  
  
  }

  //get the number of users
  getTotalUsers() : number{
    this.http.get(
      'http://localhost:8080/api/v1/count'
    ).subscribe({
      next : (data) => {
        this.count = data;
      }
    }) 
    
    return this.count;

  }

  //get the number of applications
  getTotalApplications(): number{
     this.http.get(
      'http://localhost:8080/api/v1/numApps'
    ).subscribe({
      next : (data) => {
        this.totalApplications = data;
      }
    }) 
    
    return this.totalApplications;

  }




  
  
}
