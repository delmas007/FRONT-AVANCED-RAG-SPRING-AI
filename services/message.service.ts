import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Message} from '../component/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() {}

  addMessage(content: string, isUser: boolean): void {
    const messages = this.messagesSubject.value;
    const newMessage: Message = {
      id: this.generateId(),
      content,
      isUser,
      timestamp: new Date(),
      images: this.extractImages(content)
    };

    this.messagesSubject.next([...messages, newMessage]);
  }

  private extractImages(content: string): string[] {
    const imagePattern = /URL_IMAGE\((.*?)\)=>/g;
    const images: string[] = [];
    let match;

    while ((match = imagePattern.exec(content)) !== null) {
      images.push(match[1].trim());
    }

    return images;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getCleanContent(content: string): string {
    return content.replace(/URL_IMAGE\(.*?\)=>/g, '').trim();
  }
}
