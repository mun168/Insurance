import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserDataService } from '../../service/user-data.service';

//client home component 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent {

//logout client redirect to login 
    logout(){
      localStorage.removeItem("auth-user")
      window.location.href = '/signin';
    }


}