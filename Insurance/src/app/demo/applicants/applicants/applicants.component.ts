import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AdminDataService } from '../../service/admin-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { StorageService } from '../../service/storage.service';
import { HttpClient } from '@angular/common/http';

//Admin view client applications component

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ApplicantsComponent {

  data: any[] = []
  status: any


  constructor(private adminDataService : AdminDataService,private storageService: StorageService,private http:HttpClient){}
  ngOnInit(): void {

    //get all applications in admin service
      this.adminDataService.getAllApplications().subscribe({
        next : (data) => {
          console.log(data)
          this.data = data;
        }
      })

    }

  //accept or reject application function
  Acceptprocess(id,value:string){

    console.log("appid" , id)
    this.status = value;
    const fdata = {
      status : this.status
    }

    const url = "http://localhost:8080/api/admin" + "/" + id +"/process"

    this.http.put(
      url,fdata,this.storageService.getHeader()
    ).subscribe({
      next : (data) => {
        console.log(data);
        this.ngOnInit();
      },
      error:err => {
        console.log(err)
      }
    })
  }
//delete application function
  deleteApplication(id){
    const url = "http://localhost:8080/api/admin" + "/" + id + "/delete"

    this.http.delete(
      url,this.storageService.getHeader()
    ).subscribe({
      next:(data) => {
        this.ngOnInit()
      }
    })

  }

}
