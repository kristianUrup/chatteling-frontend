import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService) { 
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getLiveUsers()
                    .subscribe((users) => {
                      this.users = users; 
                      console.log("got users"); 
                      console.log(users)
                    });
    console.log("I was here");
  }

}
