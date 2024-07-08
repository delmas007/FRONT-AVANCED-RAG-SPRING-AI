import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-mot-de-passe',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './mot-de-passe.component.html',
  styleUrl: './mot-de-passe.component.css'
})
export class MotDePasseComponent implements OnInit{
  formResetPassword!: FormGroup;
  errorMessage: any;
  loading = false;

  constructor(private fb:FormBuilder,private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.formResetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  handleResetPassword() {
    let email = this.formResetPassword.value.email;
    this.loading = true;
    this.errorMessage = null;
    this.apiService.codeMotDePasse(email)
      .then((token: any) => {
        console.log(token);
        // this.router.navigateByUrl("/user/rag");
      })
      .catch((err: any)=> {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          console.log(err);
          this.errorMessage = 'Mot de passe incorrecte';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

}
