import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public fg: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.fg = this.fb.group({
      userName: ['', [Validators.required]],
    });
  }

  get usernameCon(): FormControl {
    return this.fg.get('userName') as FormControl;
  }

  onNameSubmit(): void {
    if (this.fg.invalid) {
      return;
    }
    this.userService
      .enterChatroom(this.fg.get('userName')?.value)
      .pipe(
        catchError((error) => {
          throw error;
        })
      )
      .subscribe(() => {
        console.log('You have now entered chatroom');
        this.userService.saveUserLocally({ 
          username: this.fg.get('userName')?.value
        });
        this.router.navigate(['/chat']);
      });
  }
}
