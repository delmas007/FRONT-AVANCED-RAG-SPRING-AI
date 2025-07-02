
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode} from "jwt-decode";
import {StateService} from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(private state:StateService,private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedJwt: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedJwt.exp < currentTime) {
        localStorage.removeItem('token');
        this.state.setAuthState({ isAuthenticated: false, role: undefined });
        this.router.navigateByUrl("/sessionExpired");
        return false;
      }
    }
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

