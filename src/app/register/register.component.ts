import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Router, RouterLink} from "@angular/router";
import {Utilisateur} from "../Model/utilisateur";
import {Utilisateur2} from "../Model/utilisateur2";
import {NgIf} from "@angular/common";

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
    prenom: ""
  }
  loading = false;

  constructor(private fb:FormBuilder,private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("", [Validators.required, Validators.minLength(8)]),
      confirmePassword: this.fb.control("", [Validators.required, Validators.minLength(8)]),
      email: this.fb.control("",[Validators.required, Validators.email]),
      nom: this.fb.control(""),
      prenom: this.fb.control(""),
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
          this.errorMessage = err.error.message || 'Une erreur s\'est produite';
          console.log(err);
        }) .finally(() => {
        this.loading = false;
      });
    }else {
      this.errorMessage = 'Les mots de passe ne sont pas identiques'
    }

  }
}
