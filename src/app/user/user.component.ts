import { Component } from '@angular/core';
import {ChatComponent} from "../chat/chat.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {RagComponent} from "../rag/rag.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        ChatComponent,
        NavbarComponent,
        RagComponent,
        RouterOutlet
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {




}
