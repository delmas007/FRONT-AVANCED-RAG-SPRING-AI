import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Message, ContentPart} from '../component/models/message.model';

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
      parts: this.parseContent(content)
    };

    this.messagesSubject.next([...messages, newMessage]);
  }

  private parseContent(content: string): ContentPart[] {
    const parts: ContentPart[] = [];
    const imagePattern = /URL_IMAGE\((.*?)\)=>/g;
    let lastIndex = 0;
    let match;

    while ((match = imagePattern.exec(content)) !== null) {
      // Add text part before the image
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.substring(lastIndex, match.index) });
      }
      // Add image part
      parts.push({ type: 'image', src: match[1].trim() });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text part
    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.substring(lastIndex) });
    }

    return parts;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
