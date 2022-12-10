import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isSignedIn: any;

  constructor(private fb: FormBuilder,private readonly authService: ServiceService, private readonly router: Router) { }

  ngOnInit(): void {
    this.isSignedIn = localStorage.getItem('user') != null
    if (this.isSignedIn) {
      this.router.navigate(['/dashboard']);
    }

    this.formLogin = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  async login(){
    await this.authService.login(this.formLogin.value.email, this.formLogin.value.password)

    if (this.authService.isLoggedIn){
      this.isSignedIn = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.isSignedIn = false;
      this.authService.logout();
    }

  }

}
