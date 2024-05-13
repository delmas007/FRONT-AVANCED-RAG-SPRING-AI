import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin!: FormGroup;
  errorMessage: undefined;

  constructor(private apiService: ApiService, private router: Router) {

  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.apiService.Login(username, password)
      .then(() => {
        this.router.navigateByUrl("/admin")
      })
      .catch(err => {
        console.log(err)
        this.errorMessage = err;
      });
  }

}
