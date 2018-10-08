import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public onSubmit(data: any) {
    console.log('NICE');
    console.log(data);
    this.authService.createUser(data.name, data.email, data.password);
  }

}
