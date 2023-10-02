import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.sevice';
import { StorageService } from 'src/app/demo/service/storage.service';



@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})


//sign in comoponent to handle user login
export default class AuthSigninComponent implements OnInit{
  
    email: string = '';
    password: string = '';
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string = '';
  
    constructor(private authService: AuthService, private storageService: StorageService) { }


    //handle on change function to get user input
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
  
    ngOnInit(): void {
 
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
      }
    }

    //login user function
  
    onSubmit(event:Event): void {
      event.preventDefault();
      console.log("Logging in")
      this.authService.login(this.email, this.password).subscribe({
        next: data => {
          //save token to localstorage
          this.storageService.saveUser(data);
          console.log(data)
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;

          //get user roles
          this.roles = this.storageService.getUser().role;
          let id = this.storageService.getUser().id ; 

          //save user id to localstorage
          localStorage.removeItem("userId");
          localStorage.setItem("userId",JSON.stringify(id))      
          console.log(this.roles);

          //if statement to redirect user 
          if (this.roles === 'ROLE_APPLICANT') {
            // Redirect to client page
            window.location.href = '/home';
          } else if (this.roles === 'ROLE_ADMIN') {
            // Redirect to admin dashboard
            window.location.href = '/dashboard';
          }
        },
       
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }
  
    // reloadPage(): void {
    //   window.location.reload();
    // }
  }

