import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../login/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private authService = inject(AuthService);

  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
  
    let token = this.authService.getToken();
    console.log(token);
    if (await token) {
      return true;
    } else {
      this.authService.navigateByUrl('/login');
      return false;
    }
  }
}