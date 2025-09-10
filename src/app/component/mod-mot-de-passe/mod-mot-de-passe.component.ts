import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {RagService} from '../../services/rag.service';

@Component({
  selector: 'app-mod-mot-de-passe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './mod-mot-de-passe.component.html',
  styleUrl: './mod-mot-de-passe.component.css'
})
export class ModMotDePasseComponent implements OnInit{
  formResetPassword!: FormGroup;
  errorMessage: any;
  loading = false;
  email!: string ;


  constructor(private fb:FormBuilder,private apiService: RagService, private router: Router,private activatedRoute : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.formResetPassword = this.fb.group({
      resetCode: this.fb.control("", [Validators.required, Validators.pattern(/^\d{6}$/)]),
      newPassword: this.fb.control("", [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control("", [Validators.required, Validators.minLength(8)]),

    });
  }

  handleResetPassword() {
    let newPassword = this.formResetPassword.value.newPassword;
    let confirmPassword = this.formResetPassword.value.confirmPassword;
    let resetCode = this.formResetPassword.value.resetCode;
    this.loading = true;
    this.errorMessage = null;
    if (this.formResetPassword.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    if (newPassword === confirmPassword) {
      this.email = this.activatedRoute.snapshot.params['email']
      this.apiService.nouveauMotDePasse(this.email, resetCode, newPassword)
        .then((token: any) => {
          this.router.navigateByUrl("/connexion")
        })
        .catch(err => {
          this.loading = false;
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }else {
      this.loading = false;
      this.errorMessage = 'Les mots de passe ne sont pas identiques'
    }

  }

}

