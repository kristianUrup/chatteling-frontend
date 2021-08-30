import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public usersOnline: number = 0;
  public fg: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.fg = this.fb.group({
      userName: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get usernameCon(): FormControl {
    return this.fg.get("userName") as FormControl;
  }

  onNameSubmit(): void {
    console.log(this.fg.controls.userName.value);
  }

}
