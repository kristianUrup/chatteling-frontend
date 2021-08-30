import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatteling-frontend';
  public usersOnline: number = 0;
  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.getLiveUsers().subscribe(response => {
      this.usersOnline = response.length;
    });
  }
}
