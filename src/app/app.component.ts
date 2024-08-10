import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { AuthService } from '../app/login/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  token: any;
  profile: any = {};

  private platform = inject(Platform);
  private authService = inject(AuthService);
  
  constructor() {
    this.platform.ready().then(() => {
      this.authService.token.subscribe({
        next: (token) => {
          this.token = token;
          if(token) this.getProfile();
        }
      });
    });
  }

  getProfile() {
    this.authService
    .getProfile()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.profile = res
      },
      error: (err) => {
        this.authService.showAlert(err.error.message);
      },
    })

  }
}
