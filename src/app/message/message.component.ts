import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../models/ChatroomMessage";
import {User} from "../models/User";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() msg : Message | undefined;
  @Input() currentUser: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
