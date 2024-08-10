import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { loginUserResponse } from '../interfaces/loginUser.interface';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  
  private http = inject(HttpClient);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  private _token = new BehaviorSubject<any>(null);
  constructor() { }

  signUp(signUpData: {name:string, email: string, password: string }): Observable<loginUserResponse> {
    return this.http.post<loginUserResponse>(`${environment.apiURL}/sign-up`, signUpData);
  }
  
  showAlert(header?: string, message?: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ['Ok'],
      })
      .then((alertEl) => alertEl.present());
  }

  navigateByUrl(url: string) {
    // this.router.navigateByUrl(url, { replaceUrl: true });
    this.router.navigate([url]);
  }
}
