import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.sevice';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export default class AuthSignupComponent implements OnInit{
 
    username :string =  "";
    email : string = "";
    password : string = "";
  

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = ''

  constructor(private authService: AuthService){}

  ngOnInit(): void {}

  //handle onchange
  onEmailChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.email = target.value;
    }
  }

  onPasswordChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.password = target.value;
    }
  }

  
  onUsernameChange(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.username = target.value;
    }
  }
    
  //register user
  onSubmit(event:Event):void {
    event.preventDefault();  
    this.authService.register(this.username,this.email,this.password).subscribe({
    
      next:(data)=>{
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if(this.isSuccessful){
            //redirect to login
            window.location.href = "/signin"
          }
      },
      error:err=>{
        this.errorMessage = err.message;
        this.isSignUpFailed = true;
      }
    })
  }

}
