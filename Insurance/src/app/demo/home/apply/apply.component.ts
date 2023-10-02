import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { UserDataService } from '../../service/user-data.service';


//component for client insurance applicatioin

@Component({
  selector: 'apply-elements',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule],
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export default class ApplyComponent {

  
  constructor(private userService : UserDataService){}

    fullName : string = ''
    phone: string = ''
    street: string = ''
    city: string = ''
    country : string = ''
    postal : string = ''
    coverage : any;
    gender : any
    maritalStatus  : any
    dependants : number = 0
    dateOfBirth : string = ''
    error : string = '';
    isFailed = false;
    isSuccess = false;



  //handle on change functions
  onFullNameChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.fullName = target.value;
    }
  }

  onPhoneChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.phone = target.value;
    }
  }

  onStreetChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.street = target.value;
    }
  }

  onCityChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.city = target.value;
    }
  }

  onCountryChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.country = target.value;
    }
  }

  onPostalChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.postal = target.value;
    }
  }

  onChange($event) {
    // Check if the model variable is null
    if (this.coverage === null) {
      // Set the model variable to a value
      this.coverage = 'None';
    }

    // Update the model variable
    this.coverage = $event.target.value;
  }

  onGenderChange($event) {
    // Check if the model variable is null
    if (this.gender === null) {
      // Set the model variable to a value
      this.gender = 'None';
    }

    // Update the model variable
    this.gender = $event.target.value;
  }

  onMaritalStatusChange($event) {
   // Check if the model variable is null
   if (this.maritalStatus === null) {
    // Set the model variable to a value
    this.maritalStatus = 'None';
  }

  // Update the model variable
  this.maritalStatus = $event.target.value;
  }

  onDependantsChange(target: EventTarget  | 0) {
    if (target instanceof HTMLInputElement) {
      this.dependants = parseInt(target.value);
    }
  }

  onDateOfBirthChange(target: EventTarget  | null) {
    if (target instanceof HTMLInputElement) {
      this.dateOfBirth = target.value;
    }
  }
  
   

  //save client application
  saveUserApplication(e:Event):void{
    const form = {
      fullName: this.fullName,
      phone: this.phone,
      street: this.street,
      city: this.city,
      country: this.country,
      postal: this.postal,
      coverage: this.coverage,
      gender: this.gender,
      maritalStatus: this.maritalStatus,
      dependants: this.dependants,
      dateOfBirth: this.dateOfBirth
    }

    e.preventDefault();
    console.log("applying")
    this.userService.saveUserApplication(form).subscribe({
      next: response =>{
        console.log(response);
        this.isSuccess = true;
        this.isFailed = false;
        if(this.isSuccess){

          //redirect to view application and status
          window.location.href = "/viewApplication"
        }

      },
      error: err =>{
        this.error = err.message;
        this.isFailed = true;
      }
    })


  }
  
  logout(){
    localStorage.removeItem("auth-user")
    window.location.href = '/signin';
  }



}
