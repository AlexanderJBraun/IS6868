import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service'
import {AuthService} from '../../../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: String;
  lname: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
   // if(!this.validateService.validateRegister(user)){
    //  return false;
   // }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      return false;
    }

    // Register user
    this.authService.addUser(user).subscribe(data => {
      console.log("in register user");
      if(data.success){
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']);
      }
    });

  }

}