import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public ngOnInit() {
  }

  /**
   * Method to call of the service for logout of the app
   */
  public logout() {
    this.authService.logout();
  }

}
