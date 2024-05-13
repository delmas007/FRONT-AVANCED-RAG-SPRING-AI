import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  errorMessage: undefined;

  constructor(private fb:FormBuilder,private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]]
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.apiService.Login(username, password)
      .then((token : any) => {
        localStorage.setItem('token', token.accessToken);
        console.log(token)
        this.router.navigateByUrl("/user/rag")
      })
      .catch(err => {
        console.log(err)
        this.errorMessage = err;
      });
  }

}
