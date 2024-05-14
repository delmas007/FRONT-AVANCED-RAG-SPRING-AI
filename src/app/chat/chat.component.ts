import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {ApiService} from "../service/api.service";
import {RagComponent} from "../rag/rag.component";
import {Utilisateur} from "../Model/utilisateur";
import {StateService} from "../service/state.service";

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
  message: boolean = false;
  loader: boolean = false;
  copySuccess: boolean = false;

  constructor(public apiService: ApiService,private state: StateService) {

  }
  @ViewChild('responseTextarea') responseTextarea!: ElementRef;

  isButtonEnabled(): boolean {
    return this.question.trim().length > 0 && !this.message;
  }
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.response)
      .then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
  }

  submitQuestion(): void {
    this.envoyerQuestion(this.question);

  }

  adjustTextarea(textarea: HTMLTextAreaElement | Event): void {
    const textElement: HTMLTextAreaElement = (textarea instanceof Event) ? (<HTMLTextAreaElement>textarea.target) : textarea;
    textElement.style.height = 'auto'; // Réinitialiser la hauteur
    textElement.style.height = `${textElement.scrollHeight}px`; // Ajuster la hauteur à celle du contenu
  }
  envoyerQuestion(question: string) {
    let  user :Utilisateur = {id :this.state.authState.id,username:'',password:'',nom:'',prenom:'',email:''}
    this.message = true;
    this.loader = true;
    this.apiService.question(question,user)
      .then(reponse => {
        this.response = reponse.result;
        this.showResponse = true;
        setTimeout(() => {
          this.adjustTextarea(this.responseTextarea.nativeElement);
        }, 0);
        this.message = false;
        this.loader = false;
      })
      .catch(err => {
        console.error(err);
        this.message = false;
        this.loader = false;
      });
  }

}
