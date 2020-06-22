import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;
  constructor(private router : Router) {
    if(localStorage.getItem('isLogin') !== null){
      this.router.navigate(['home/dashboard']);
    }
   }

  ngOnInit(): void {
  }

  loginClick(){
    console.log(this.email,this.password);
    if(this.email === 'abc@gmail.com' && this.password === '12345'){
      localStorage.setItem('isLogin','true');
  this.router.navigate(['home/dashboard']);
    }
    
  }

}
