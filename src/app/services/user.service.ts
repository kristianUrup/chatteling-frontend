import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //TODO Actual endpoint route here
  private readonly BASE_URL: string = 'http://localhost:5000/users';
  constructor(private client: HttpClient, private socket: Socket) {}

  enterChatroom(userName: string): Observable<any> {
    return this.client.post(this.BASE_URL, { userName });
  }

  getLiveUsers(): Observable<number> {
    return this.socket.fromEvent<number>('users-online').pipe(
      tap((x) => {
        console.log(x);
      })
    );
  }
}
