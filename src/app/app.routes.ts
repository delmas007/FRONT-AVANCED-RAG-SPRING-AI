import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RagComponent} from "./rag/rag.component";
import {RegisterComponent} from "./register/register.component";
import {AuthenticationGuard} from "./guards/authentication.guard";

export const routes: Routes = [
  { path : "login" , component : LoginComponent},
  { path : "inscription" , component : RegisterComponent},
  { path : "user" , component : UserComponent ,children : [
      { path : "rag" , component : RagComponent,canActivate:[AuthenticationGuard]},
    ]},
  { path : "" , redirectTo : "/login", pathMatch : "full"}
];
