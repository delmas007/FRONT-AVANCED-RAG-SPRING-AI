import { Routes } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {VerifyCodeComponent} from './component/verify-code/verify-code.component';
import {ModMotDePasseComponent} from './component/mod-mot-de-passe/mod-mot-de-passe.component';
import {MotDePasseComponent} from './component/mot-de-passe/mot-de-passe.component';
import {NotAuthorizedComponent} from './component/not-authorized/not-authorized.component';
import {SessionComponent} from './component/session/session.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {AuthorizationGuard} from './guards/authorization.guard';
import {App} from './app';
import {RagChat} from './component/rag-chat/rag-chat';
import {Default} from './component/default/default';

export const routes: Routes = [
  { path : "connexion" , component : LoginComponent},
  { path : "inscription" , component : RegisterComponent},
  { path : "verification/:email" , component : VerifyCodeComponent},
  { path : "modifier-mot-de-passe/:email" , component : ModMotDePasseComponent},
  { path : "mot-de-passe" , component : MotDePasseComponent},
  { path: "notAuthorized", component: NotAuthorizedComponent },
  { path: "sessionExpired", component: SessionComponent },
  { path : "user" , component : App,canActivate:[AuthenticationGuard] ,children : [
      { path : "rag" , component : Default,canActivate:[AuthorizationGuard]},
    ]},

  { path : "" , redirectTo : "/connexion", pathMatch : "full"}
];
