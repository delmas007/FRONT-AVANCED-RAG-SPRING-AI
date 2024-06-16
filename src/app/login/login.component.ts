import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Router, RouterLink} from "@angular/router";
import {StateService} from "../service/state.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  errorMessage: any;
  loading = false;

  constructor(private fb:FormBuilder,private apiService: ApiService, private router: Router,private state: StateService) {

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
    this.loading = true;
    this.errorMessage = null;
    this.apiService.Login(username, password)
      .then((token: any) => {
        localStorage.setItem('token', token.accessToken);
        this.state.loadToken();
        this.router.navigateByUrl("/user/rag");
      })
      .catch(err => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Mot de passe incorrecte';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }


}
