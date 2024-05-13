import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RagComponent} from "./rag/rag.component";

export const routes: Routes = [
  { path : "login" , component : LoginComponent},
  { path : "user" , component : UserComponent ,children : [
      { path : "rag" , component : RagComponent},
    ]},
];
