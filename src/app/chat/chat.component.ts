import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  {

  question: string = '';
  response: string = '';
  showResponse: boolean = false;

  constructor(private apiService: ApiService) {

  }

  @ViewChild('responseTextarea', { static: false }) responseTextarea!: ElementRef;

  isButtonEnabled(): boolean {
    return this.question.trim().length > 0;
  }

  submitQuestion(): void {
    this.envoyerQuestion(this.question);
    this.showResponse = true;

    setTimeout(() => {
      this.adjustTextarea(this.responseTextarea.nativeElement);
    }, 0); // Un petit délai pour s'assurer que le DOM est à jour
  }

  adjustTextarea(textarea: HTMLTextAreaElement | Event): void {
    const textElement: HTMLTextAreaElement = (textarea instanceof Event) ? (<HTMLTextAreaElement>textarea.target) : textarea;
    textElement.style.height = 'auto'; // Réinitialiser la hauteur
    textElement.style.height = `${textElement.scrollHeight}px`; // Ajuster la hauteur à celle du contenu
  }

  envoyerQuestion(question:String){
      this.apiService.question(question).subscribe({
        next: (response) => {
          console.log(response)
          this.response = response;

        },
        error: (error) => {
          console.error('Erreur:', error); // Affichez l'erreur
        },
      });
  }
}
