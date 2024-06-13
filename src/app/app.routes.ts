import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RagComponent} from "./rag/rag.component";
import {RegisterComponent} from "./register/register.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {VerifyCodeComponent} from "./verify-code/verify-code.component";

export const routes: Routes = [

  { path : "connexion" , component : LoginComponent},
  { path : "inscription" , component : RegisterComponent},
  { path : "verification" , component : VerifyCodeComponent},

  { path : "user" , component : UserComponent,canActivate:[AuthenticationGuard] ,children : [
      { path : "rag" , component : RagComponent,canActivate:[AuthorizationGuard]},
    ]},

  { path : "" , redirectTo : "/verification", pathMatch : "full"}
];
