import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {RagService} from '../../services/rag.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent implements OnInit {
  digits: string[] = new Array(6).fill('');
  isError: boolean = false;
  resendDisabled: boolean = false;
  countdownTimer: number = 3;
  email!: string ;
  code: string[] = ['', '', '', '', '', ''];

  constructor(private apiService: RagService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.resendDisabled = true;
    const interval = setInterval(() => {
      this.countdownTimer--;
      if (this.countdownTimer <= 0) {
        clearInterval(interval);
        this.resendDisabled = false;
        this.countdownTimer = 30;
      }
    }, 1000);
  }

  verifyCode() {
    const code = this.code.join('');
    this.apiService.Verification(code)
      .then((response: any) => {
        this.router.navigateByUrl("/connexion");
      })
      .catch(error => {
        this.isError = true;
        const inputs = document.querySelectorAll('.code-inputs input');
        inputs.forEach(input => input.classList.add('shake'));

        setTimeout(() => {
          this.isError = false;
          inputs.forEach(input => input.classList.remove('shake'));
        }, 1000);
      });
  }

  resendCode() {
    this.countdownTimer = 30;
    this.startCountdown();
    this.email = this.activatedRoute.snapshot.params['email']

    this.apiService.resendMail(this.email).then((response: any) => {
      console.log('Code renvoyé avec succès', response)
    })
      .catch(error => {
        console.log('Erreur lors de l\'envoi du code', error)
      });
  }

  onResendClick(event: Event) {
    event.preventDefault();
    this.resendCode();
  }

  moveFocus(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!/^\d$/.test(input.value)) {
      input.value = '';
      return;
    }
    if (input.value.length > 0 && index < this.code.length - 1) {
      const nextInput = document.querySelectorAll('.code-inputs input')[index + 1] as HTMLInputElement;
      nextInput.focus();
    } else {
      this.verifyCode();
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('Text').trim();

    if (/^\d{6}$/.test(pastedData)) {
      for (let i = 0; i < this.code.length; i++) {
        this.code[i] = pastedData[i] || '';
      }
      this.verifyCode();
    }
  }
}

