import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  //TODO Actual endpoint route here
  private readonly BASE_URL: string = 'http://localhost:5000/users';
  private countBehavior: BehaviorSubject<number> = new BehaviorSubject(0);
  private usersBehavior: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private count$: Observable<number> = this.countBehavior.asObservable();
  private users$: Observable<User[]> = this.usersBehavior.asObservable();
  constructor(private client: HttpClient, private socket: Socket) {
    this.socket.fromEvent<number>('active-users-count').subscribe((count) => {
      this.countBehavior.next(count);
    })
    this.socket.fromEvent<User[]>('active-users').subscribe((users) => {
      console.log(users);
      this.usersBehavior.next(users);
    });
  }

  enterChatroom(userName: string): Observable<any> {
    return this.client.post(this.BASE_URL, { username: userName });
  }

  getLiveUsersCount(): Observable<number> {
    return this.count$;
  }

  getLiveUsers(): Observable<User[]> {
    return this.users$;
  }
}
