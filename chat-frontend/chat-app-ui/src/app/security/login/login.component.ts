import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required])],
    })
   }

  ngOnInit(): void {
    if(localStorage.getItem('username')){
      this.router.navigate(['/chats'])
    }
  }

  loginMethod(form){
    if(form.Username.length != 0 && form.Password.length != 0){
      this.http.get("http://localhost:3000/api/getUserByUsername?username="+form.Username).subscribe((data: any) => {
        if(data){
          if(data.password == form.Password){
            console.log('success');
            this.router.navigate(['/chats'])
            localStorage.setItem('username', form.Username)
          }
        }
        
      })
    }
  }

}
