import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserDataService } from '../../service/user-data.service';

//client home component 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.scss'],
})


//componenent to view client applications
export default class UserAppComponent implements OnInit {

  data: any[] = []
  showAcceptedTable = false;
  showRejectedTable = false;
  originalTable = true
  acceptedData :any[] = []
  rejectedData : any[] = []



  constructor(private useService : UserDataService){}
  ngOnInit(): void {
      this.useService.getApplications().subscribe({
        next : (data) => {
          console.log(data);
          this.data = data;
          // this.acceptedData = this.toggleAcceptedTable();
          // console.log(this.acceptedData)
          // this.rejectedData = this.toggleRejectedTable();
          // console.log(this.rejectedData)

        }
      })

    }

    //logout client

    logout(){
      localStorage.removeItem("auth-user")
      window.location.href = '/signin';
    }

    filter(value:string):any[]{
      this.data = this.data.filter(application => application.status === value);

      return this.data;
    }

    toggleAcceptedTable(value : string) :any[]{

      // if(value === "accepted")
      //   this.showAcceptedTable = true;   
      //   this.showRejectedTable = false;
      //   this.originalTable = false;
      //   this.data = this.data.filter(application => application.status === value);
      //  else if(value==="rejected"){

      // }
      // return this.filter("accepted");
      
      switch(value){
        case "accepted" : 
          this.showAcceptedTable = true;  
          this.showRejectedTable = false;
          this.originalTable = false;
          this.acceptedData = this.data.filter(application => application.status === value); break;
        case "rejected" : 
          this.showAcceptedTable = false;  
          this.showRejectedTable = true;
          this.originalTable = false;
          this.rejectedData = this.data.filter(application => application.status === value); break;
        default:   
          this.showAcceptedTable = false; 
          this.showRejectedTable = true;
          this.originalTable = false;
          this.data = this.data.filter(application => application.status === value); 
          
      }

  
      console.log(this.data)

      return this.data;

      

    }
  
    // toggleRejectedTable() : any[]{
    //   this.showAcceptedTable = false;   
    //   this.showRejectedTable = true;
    //   this.originalTable = false;

    //   return this.filter("rejected");
    // }

  

}