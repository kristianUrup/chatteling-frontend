import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs/operators';
import {Message} from "../models/ChatroomMessage";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //TODO Actual endpoint route here
  private readonly BASE_URL: string = 'http://localhost:5000/users';
  constructor(private client: HttpClient, private socket: Socket) {}

  enterChatroom(userName: string): Observable<any> {
    return this.client.post(this.BASE_URL, { username: userName });
  }

  getLiveUsers(): Observable<number> {
    return this.socket.fromEvent<number>('active-users-count').pipe(
      tap((x) => {
        console.log(x);
      })
    );
  }

  sendMessage(message : string, username: string) : void {
    this.socket.emit('sendMessage', {
      from: username,
      content: message
    })
  }

  getNewMessages() : Observable<Message> {
    return this.socket.fromEvent<Message>('messages-new');
  }

  getAllMessages() : Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages-all');
  }


}
