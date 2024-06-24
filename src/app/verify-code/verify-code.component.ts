import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ApiService} from "../service/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent implements OnInit {
  digits: string[] = new Array(6).fill('');
  isError: boolean = false;
  resendDisabled: boolean = false;
  countdownTimer: number = 3; // Temps en secondes
  email!: string ;

  constructor(private apiService: ApiService, private http: HttpClient,private router: Router,private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    // Démarre le compte à rebours dès que le composant est initialisé
    this.startCountdown();
  }

  startCountdown() {
    this.resendDisabled = true; // Désactive le lien de renvoi
    const interval = setInterval(() => {
      this.countdownTimer--;
      if (this.countdownTimer <= 0) {
        clearInterval(interval);
        this.resendDisabled = false; // Active à nouveau le lien de renvoi
        this.countdownTimer = 30; // Réinitialise le compte à rebours
      }
    }, 1000); // 1000 ms = 1 seconde
  }

  verifyCode() {
    const code = this.digits.join('');
    console.log('Vérification du code:', code);
    this.apiService.Verification(code)
      .then((response: any) => {
        this.router.navigateByUrl("/connexion")
      })
      .catch(error => {
        console.error('Échec de la validation du code.', error);
        this.isError = true;
        setTimeout(() => this.isError = false, 5000);
      });
  }
  resendCode() {
    this.countdownTimer = 30;
    this.startCountdown();
    this.email = this.activatedRoute.snapshot.params['email']
    // console.log('Renvoi du code à l\'adresse e-mail:', this.email);

    // Appel à votre service HTTP pour renvoyer le code
    this.apiService.resendMail(this.email).then((response: any) => {
      // console.log('Code renvoyé avec succès', response)
    })
      .catch(error => {
        // console.log('Erreur lors de l\'envoi du code', error)
      });
  }

  onResendClick(event: Event) {
    event.preventDefault();
    this.resendCode();
  }


  onModelChange(value: any, index: number) {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue.match(/^[0-9]$/) && index < this.digits.length) {
      this.digits[index] = trimmedValue;

      if (index < this.digits.length - 1) {
        const nextInput = document.getElementById('input_' + (index + 1)) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        this.verifyCode();
      }
    } else {
      this.digits[index] = '';
    }

    console.log('État actuel des chiffres:', this.digits);
  }


}
