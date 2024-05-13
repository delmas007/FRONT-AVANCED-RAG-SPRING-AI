import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";

export const routes: Routes = [
  { path : "login" , component : LoginComponent},
  { path : "admin" , component : UserComponent,canActivate:[] ,children : [
      // { path : "products" , component : ProductsComponent},
      // { path : "newProduct" , component : NewProductComponent,canActivate:[AuthorizationGuard],
      //   data : { roles : 'ADMIN' }
      // },
    ]},
];
