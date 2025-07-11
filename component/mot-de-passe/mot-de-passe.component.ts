import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {RagService} from '../../services/rag.service';

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

  constructor(private fb:FormBuilder,private apiService: RagService, private router: Router) {
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
    if (this.formResetPassword.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    this.apiService.codeMotDePasse(email)
      .then((token: any) => {
        this.router.navigateByUrl(`/modifier-mot-de-passe/${email}`);
      })
      .catch((err: any)=> {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.loading = false;
          console.log(err);
          this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

}
