import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import {Message} from "../models/ChatroomMessage";
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL: string = 'http://localhost:5000/users';
  private countBehavior: BehaviorSubject<number> = new BehaviorSubject(0);
  private usersBehavior: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  private count$: Observable<number> = this.countBehavior.asObservable();
  private users$: Observable<User[]> = this.usersBehavior.asObservable();
  constructor(private client: HttpClient, private socket: Socket) {}

  enterChatroom(userName: string): Observable<any> {
    return this.client.post(this.BASE_URL, { username: userName });
  }

  public getUsersCount(): Observable<number> {
    this.client.get<number>(this.BASE_URL + '/count').subscribe((count) => {
      this.countBehavior.next(count);
    });
    this.socket.fromEvent<number>('active-users-count').subscribe((count) => {
      this.countBehavior.next(count);
    });
    return this.count$;
  }

  public getUsers(): Observable<User[]> {
    this.client.get<User[]>(this.BASE_URL).subscribe((users) => {
      this.usersBehavior.next(users);
    });
    this.socket.fromEvent<User>('active-users-new').subscribe((user) => {
      const users = this.usersBehavior.value;
      this.usersBehavior.next([...users, user]);
    });
    return this.users$;
  }

  getLiveUsersCount(): Observable<number> {
    return this.getUsersCount();
  }

  getLiveUsers(): Observable<User[]> {
    return this.getUsers();
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
