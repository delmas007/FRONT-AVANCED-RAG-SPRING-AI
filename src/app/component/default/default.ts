import { Component } from '@angular/core';
import {Chat} from '../chat/chat';
import {FileUpload} from '../file-upload/file-upload';
import {NgIf} from '@angular/common';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-default',
  imports: [
    Chat,
    FileUpload,
    NgIf
  ],
  templateUrl: './default.html',
  standalone: true,
  styleUrl: './default.css'
})
export class Default {
  constructor(public state: StateService) {}
}
