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
  filteredData: any[] = [];



  constructor(private useService : UserDataService){}
  ngOnInit(): void {
      this.useService.getApplications().subscribe({
        next : (data) => {
          console.log(data);
          this.data = data;
          this.filteredData = this.data;
        }
      })

    }

    //logout client

    logout(){
      localStorage.removeItem("auth-user")
      window.location.href = '/signin';
    }

  //filter data in client table
  searchTerm: string;

  filterTable(): void {
    if (!this.searchTerm) {
      this.filteredData = [...this.data];
      console.log(this.filteredData)
      return;
    }

    this.filteredData = this.data.filter((item) =>
      this.matchSearchTerm(item, this.searchTerm)
    );
  }

  matchSearchTerm(item: any, searchTerm: string): boolean {
    searchTerm = searchTerm.toLowerCase();

    const properties = Object.values(item);
    return properties.some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(searchTerm);
      } else if (typeof property === 'number') {
        return property.toString().includes(searchTerm);
      }
      return false;
    });
  }

}