import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Message} from "../models/ChatroomMessage";
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  public users: User[];
  public fg: FormGroup;
  public chatroomMessages: Message[] = [];
  public currentUser: User = {
    username : "me"
  };

  get messageCon(): FormControl {
    return this.fg.get('message') as FormControl;
  };
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.users = [];
    this.fg = this.fb.group({
      message: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.userService.enterChatroom('me').subscribe(value => console.log('entered chatroom'));
    this.userService.getAllMessages().subscribe(value => {
      console.log(value);
      this.chatroomMessages = value;
    });
    console.log(this.chatroomMessages);

    this.userService.getLiveUsers()
      .subscribe((users) => {
        this.users = users;
        console.log("got users");
        console.log(users)
      });
    console.log("I was here");
  }


  onMessageSubmit() : void {
    if(this.fg.invalid) {
      return;
    }
    const message = this.fg.get('message')?.value;
    this.userService.sendMessage(message, 'me');
  }
}
