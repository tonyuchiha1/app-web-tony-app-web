import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSignedIn: any;
  opcion = false;

  constructor(private readonly authService: ServiceService, private readonly router: Router) { }

  ngOnInit(): void {
    this.isSignedIn = localStorage.getItem('user') != null;
    if (!this.isSignedIn) {
      this.navigateLogin()
    }
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.navigateLogin())
      .catch((e) => console.log(e.message));
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }

}
