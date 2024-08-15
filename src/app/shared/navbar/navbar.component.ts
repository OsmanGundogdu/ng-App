import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.email == environment.adminEmail;
    })
  }

  logout() {
    this.authService.logout();
  }

}
