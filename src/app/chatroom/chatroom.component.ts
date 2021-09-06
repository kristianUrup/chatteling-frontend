import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {Message} from "../models/ChatroomMessage";
import {take} from "rxjs/operators";
import {THIS_EXPR} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  public fg: FormGroup;
  public chatroomMessages: Message[] = [];

  get messageCon(): FormControl {
    return this.fg.get('message') as FormControl;
  };
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.fg = this.fb.group({
    message: ['', [Validators.required]],
  }); }

  ngOnInit(): void {
    this.userService.enterChatroom('me').subscribe(value => console.log('entered chatroom'));
    this.userService.getAllMessages().subscribe(value => {
      console.log(value);
      this.chatroomMessages = value;
    });
    this.userService.getNewMessages().subscribe(value => {
      console.log(value);
      this.chatroomMessages.push(value);
    });
    console.log(this.chatroomMessages);
  }

  onMessageSubmit() : void {
    if(this.fg.invalid) {
      return;
    }
    const message = this.fg.get('message')?.value;
    this.userService.sendMessage(message, 'me');
  }
}
