import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {Message} from '../models/message.model';
import {MessageService} from '../../services/message.service';
import {RagService} from '../../services/rag.service';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit {
  messages$: Observable<Message[]>;
  currentMessage = '';
  isLoading = false;

  constructor(
    public messageService: MessageService,
    private ragService: RagService
  ) {
    this.messages$ = this.messageService.messages$;
  }

  ngOnInit(): void {}

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const message = this.currentMessage.trim();
    this.messageService.addMessage(message, true);
    this.currentMessage = '';
    this.isLoading = true;

    this.ragService.askQuestion(message).subscribe({
      next: (response) => {
        this.messageService.addMessage(response, false);
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Erreur lors de la question:', error);
        this.messageService.addMessage('Désolé, une erreur est survenue lors du traitement de votre question.', false);
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
    console.error('Erreur lors du chargement de l\'image:', event.target.src);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }

}
