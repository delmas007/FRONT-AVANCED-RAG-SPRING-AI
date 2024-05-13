
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {StateService} from "../service/state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(private state:StateService,private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.state.authState.role);
    if (this.state.authState.isAuthenticated ) {
      if (this.state.authState.role == "ADMIN" || this.state.authState.role == "USER") {
        return true;
      }
      this.router.navigateByUrl("/connexion");
      return false;
    } else {
      this.router.navigateByUrl("/connexion");
      return false;
    }
  }
}

