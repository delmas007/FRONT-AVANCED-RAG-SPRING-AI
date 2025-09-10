import { Component } from '@angular/core';
import {FileUpload} from '../file-upload/file-upload';
import {Chat} from '../chat/chat';

@Component({
  selector: 'app-rag-chat',
  imports: [
    FileUpload,
    Chat
  ],
  templateUrl: './rag-chat.html',
  standalone: true,
  styleUrl: './rag-chat.css'
})
export class RagChat {
  onFilesUploaded(): void {
    console.log('Fichiers téléchargés avec succès!');
  }
}
