import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {StateService} from '../../services/state.service';
import {RagService} from '../../services/rag.service';

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

  constructor(private fb:FormBuilder,private apiService: RagService, private router: Router,private state: StateService) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("", [Validators.required, Validators.minLength(8)])
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.loading = true;
    this.errorMessage = null;
    if (this.formLogin.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
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
          this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }


}
