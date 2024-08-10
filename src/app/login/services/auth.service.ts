import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../../utilities/storage.service'
import { Strings } from '../../utilities/enum/string.enum'
import { environment } from '../../../environments/environment'
import { UserResponse } from '../interfaces/userData.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private storage = inject(StorageService);

  private _token = new BehaviorSubject<any>(null);

  get token() {
    return this._token.asObservable();
  }

  constructor() { }

  updateToken(token: string) {
    this._token.next(token);
  }

  async getToken() {
    let token: any = this._token.value;
    if (!token) {
      token = (await this.storage.getStorage(Strings.TOKEN)).value;
      if(token) this.updateToken(token);
    }
    return token;
  }

  setUserData(token: string) {
    this.storage.setStorage(Strings.TOKEN, token);
    this.updateToken(token);
  }

  login(loginData: { email: string, password: string }): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiURL}/login`, loginData);
  }

  showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Ok'],
      })
      .then((alertEl) => alertEl.present());
  }

  authGuard(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = this.getToken();
      console.log(token);
      if (token != null) {
        return true;
      } else {
        this.navigateByUrl('/login');
        return false;
      }
  }

  getProfile() {
    return this.http.get<any>(environment.apiURL + '/profile')
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
