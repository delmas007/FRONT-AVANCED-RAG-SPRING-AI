import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {noWhitespaceValidator} from "./validators";
import {Utilisateur2} from '../models/utilisateur2';
import {RagService} from '../../services/rag.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formLogin!: FormGroup;
  errorMessage: any;
  donnee: Utilisateur2 = {
    username: "",
    password: "",
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    bearer: "",
    isAuthenticated: false,
    fileUploaded: false
  }
  loading = false;

  constructor(private fb:FormBuilder,private apiService: RagService, private router: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({

      username: this.fb.control("", [Validators.required, noWhitespaceValidator()]),
      password: this.fb.control("", [Validators.required, Validators.minLength(8), noWhitespaceValidator()]),
      confirmePassword: this.fb.control("", [Validators.required, Validators.minLength(8), noWhitespaceValidator()]),
      email: this.fb.control("", [Validators.required, Validators.email, noWhitespaceValidator()]),
      nom: this.fb.control("", [Validators.required, noWhitespaceValidator()]),
      prenom: this.fb.control("", [Validators.required, noWhitespaceValidator()]),
    });
  }

  handRegister() {
    let confirmePassword = this.formLogin.value.confirmePassword;
    this.donnee.username = this.formLogin.value.username;
    this.donnee.password = this.formLogin.value.password;
    this.donnee.email = this.formLogin.value.email;
    this.donnee.nom = this.formLogin.value.nom;
    this.donnee.prenom = this.formLogin.value.prenom;
    this.errorMessage = null;
    if (this.formLogin.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    if (this.donnee.password === confirmePassword) {
      this.loading = true;
      this.apiService.registration(this.donnee)
        .then((response : any) => {
          this.router.navigateByUrl(`/verification/${this.donnee.email}`)
        })
        .catch(err => {
          this.errorMessage = err.error.message || 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
          console.log(err);
        }) .finally(() => {
        this.loading = false;
      });
    }else {
      this.errorMessage = 'Les mots de passe ne sont pas identiques'
    }

  }
}
