import { Component } from '@angular/core';
import {RagChat} from '../rag-chat/rag-chat';

@Component({
  selector: 'app-default',
  imports: [
    RagChat
  ],
  templateUrl: './default.html',
  styleUrl: './default.css'
})
export class Default {

}
