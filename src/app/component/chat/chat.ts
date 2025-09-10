import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Message} from '../models/message.model';
import {MessageService} from '../../services/message.service';
import {RagService} from '../../services/rag.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    DatePipe,
    AsyncPipe,
    MarkdownComponent
  ],
  templateUrl: './chat.html',
  standalone: true,
  styleUrl: './chat.css'
})
export class Chat implements OnInit {
  messages$: Observable<Message[]>;
  currentMessage = '';
  isLoading = false;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(
    private messageService: MessageService,
    private ragService: RagService
  ) {
    this.messages$ = this.messageService.messages$.pipe(
      tap(() => this.scrollToBottom())
    );
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }

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
      },
      error: (error) => {
        console.error('Erreur lors de la question:', error);
        this.messageService.addMessage('Désolé, une erreur est survenue lors du traitement de votre question.', false);
        this.isLoading = false;
      }
    });
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
    console.error('Erreur lors du chargement de l\'image:', event.target.src);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Could not scroll to bottom:', err);
      }
    }, 0);
  }
}
