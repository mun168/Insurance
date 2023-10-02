import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { AdminDataService } from 'src/app/demo/service/admin-data.service';

//Admin apply for client component

@Component({
  selector: 'add-applicant-elements',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule],
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.scss'],
})
export default class AddApplicantComponent {

  constructor(private adminService : AdminDataService){}

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
  this.adminService.saveUserApplication(form).subscribe({
    next: response =>{
      console.log(response);
      this.isSuccess = true;
      this.isFailed = false;
      if(this.isSuccess){
        window.location.href = "/applicant/view"
      }

    },
    error: err =>{
      this.error = err.message;
      this.isFailed = true;
    }
  })


}
}
