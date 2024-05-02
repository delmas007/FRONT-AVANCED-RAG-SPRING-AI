import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  actions : Array<any> = [
    { title : 'Home' , routes : '/admin/home' , icon :'bi-house',nav : 'nav-link'},
    { title : 'Products' , routes : '/admin/products' , icon :'bi-search',nav : 'nav-link'},
    { title : 'New products' , routes : '/admin/newProduct' , icon :'bi-plus-circle',nav : 'nav-link'}
  ]

  currentAction : any;

  setCurrentAction (action : any){
    this.currentAction=action;
  }

  logout() {

  }
}
