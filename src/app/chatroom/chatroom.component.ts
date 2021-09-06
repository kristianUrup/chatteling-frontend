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
  public currentUser: User | undefined;
  public fg: FormGroup;
  public chatroomMessages: Message[] = [];
  public typingList: string[] = [];

  get messageCon(): FormControl {
    return this.fg.get('message') as FormControl;
  };
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.users = [];
    this.currentUser = undefined;
    this.fg = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userService.getLocalUser().subscribe(value => {
      this.currentUser = value;
    })
    this.userService.getAllMessages().subscribe(value => {
      console.log(value);
      this.chatroomMessages = value;
    });
    console.log(this.chatroomMessages);

    this.userService.getLiveUsers()
      .subscribe((users) => {
        this.users = users;
        console.log(this.users)
      });
      this.userService.getLocalUser()
      .subscribe((user) => {
        this.currentUser = user;
        console.log(user);
        console.log(this.currentUser);
      })
    console.log("I was here");

    this.messageCon.valueChanges.subscribe(value => {
      if(!this.currentUser) {
        return;
      }
      console.log(value);
      if(!value) {
        console.log("stopped typing");
        this.userService.EmitStoppedTyping(this.currentUser.username);
      } else {
        console.log("started typing");
        this.userService.EmitStartedTyping(this.currentUser.username);
      }
    });
    this.userService.GetTypingList().subscribe(value => {
      console.log(value)
      this.typingList = value;
    });
  }

  onMessageSubmit() : void {
    if(this.fg.invalid) {
      return;
    }
    const message = this.fg.get('message')?.value;
    this.userService.sendMessage(message, 'me');
  }
}
