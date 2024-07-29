import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { StorageService } from '../../utilities/storage.service'
import { Strings } from '../../utilities/enum/string.enum'
import { environment } from '../../../environments/environment'

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

  async login(email: string, password: string): Promise<any> {
    try {

      const data = {
        email,
        password,
      };
      const response = await lastValueFrom(
        this.http.post<any>(environment.apiURL + 'login', data)
      );
      console.log(response);

      //save token in local storage
      this.setUserData(response?.token);

      return response;
    } catch (e) {
      throw e;
    }
  }

  showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }

  async authGuard(): Promise<boolean> {
    try {
      const token = await this.getToken();
      console.log(token);
      if (!token) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
