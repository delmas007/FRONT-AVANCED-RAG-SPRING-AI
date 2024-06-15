import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Router, RouterLink} from "@angular/router";
import {Utilisateur} from "../Model/utilisateur";
import {Utilisateur2} from "../Model/utilisateur2";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formLogin!: FormGroup;
  errorMessage: undefined;
  donnee: Utilisateur2 = {
    username: "",
    password: "",
    email: "",
    nom: "",
    prenom: ""
  }

  constructor(private fb:FormBuilder,private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
      confirmePassword: this.fb.control(""),
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
    if (this.donnee.password === confirmePassword) {
      console.log(this.donnee)
      this.apiService.registration(this.donnee)
        .then((response : any) => {
          this.router.navigateByUrl("/verification")
        })
        .catch(err => {
          console.log(err)
          this.errorMessage = err;
        });
    }else {
      console.log('Les mots de passe ne sont pas identiques')
    }

  }
}
