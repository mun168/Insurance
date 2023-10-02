import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AdminDataService } from '../../service/admin-data.service';

//user visits components

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export default class UserComponent implements OnInit{

  data: any[] = []

  //user component to get details of users who registered to the system

  constructor(private adminService : AdminDataService){}
  ngOnInit(): void {
      this.adminService.getUsers().subscribe({
        next : (data) => {
          console.log(data)
          this.data = data;
        }
      })

    }

    //set user id on localstorage

    setLocal(id:any){
      localStorage.removeItem("userId");
      localStorage.setItem("userId",JSON.stringify(id));
    }
}
