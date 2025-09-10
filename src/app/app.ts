import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RagChat} from './component/rag-chat/rag-chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected title = 'avanced-rag-front';
}
