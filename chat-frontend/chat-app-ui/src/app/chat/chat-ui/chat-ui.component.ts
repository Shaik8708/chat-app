import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.css']
})
export class ChatUiComponent implements OnInit {

  message ;
  username ;
  noData: boolean = true;
  myName = localStorage.getItem('username');
  messages = [];
  users = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.getAllUsers()
    if(!localStorage.getItem('username')){
      this.router.navigate(['/login'])
    }
    // Pusher.logToConsole = true;
    if(this.username){
      
      const pusher = new Pusher('c26bd363f7279ef9fa38', {
        cluster: 'ap2'
      });
      
      let channel = pusher.subscribe('chat');
      channel.bind('message', (data: any) => {
        data.timeStr = new Date(data.sentTime * 1000).toLocaleString('en-GB', { hour12:false } )
        this.messages.push(data)
      });
      
      this.noData = false
      console.log(this.messages);
    }else{
      this.noData = true
    }

  }

  getAllUsers(){
    this.http.get("http://localhost:3000/api/getAllUsers").subscribe((data: any) => {
      if(data){
        let usr = localStorage.getItem('username')
        for (let i = 0; i < data.length; i++) {
          if(data[i].username == usr){
            data.splice(i, 1)
          } 
        }
        this.users= data;
      }
    })
  }

  submit(){
    this.http.post('http://localhost:3000/api/message', {
      messageFrom: localStorage.getItem('username'),
      messageTo: this.username,
      sentTime: Math.floor(new Date().getTime()/1000),
      message: this.message
    }).subscribe(() => {
      this.message = '';
    })
  }

  changeChat(user){
    this.username = user
    
    this.getUserMessages(localStorage.getItem('username'), this.username)
  }

  getUserMessages(messageFrom, messageTo){
    this.http.get("http://localhost:3000/api/getMessagesByUsername?messageFrom="+messageFrom+"&messageTo="+messageTo).subscribe((data: any) => {
      this.messages = [...data.user1, ...data.user2];
      this.messages.forEach((ele) => {
        ele.timeStr = new Date(ele.sentTime * 1000).toLocaleString('en-GB', { hour12:false } )
      })
      this.messages.sort((a, b) => a.sentTime - b.sentTime);
      console.log(this.messages, "after get");
      
      this.ngOnInit()
    })
  }

}
