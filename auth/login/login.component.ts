import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public ngOnInit() {
  }

  public onSubmit(data: any) {
    this.authService.login(data.email, data.password);
  }

}
