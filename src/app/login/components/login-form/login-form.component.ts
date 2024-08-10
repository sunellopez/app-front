import { Component, inject, OnInit} from '@angular/core';
import { IonicModule, NavController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline} from 'ionicons/icons'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class LoginFormComponent  implements OnInit {

  public form!: FormGroup;
  private navController = inject(NavController)
  private loadingCtrl = inject(LoadingController)
  private authService = inject(AuthService);
  isLogin = false;

  constructor(
    private router: Router
  ) { 
    this.initForm();

    addIcons({
      mailOutline,
      lockClosedOutline
    });
  }

  ngOnInit() {
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.login();
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      translucent: true
    });

    await loading.present();

    this.isLogin = true;
    
    const loginData = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService
      .login(loginData)
      .pipe(
        delay(1000)
      )
      .subscribe({
        next: (res) => {
          this.authService.setUserData(res.token);
          if (res?.success == 1) {
            loading.dismiss().then(() => {
              this.authService.navigateByUrl('/home');
              this.isLogin = false;
              this.form.reset();
            });
          } else {
            loading.dismiss().then(() => {
              this.isLogin = false;
              this.authService.showAlert(res.message);
            });
          }
        },
        error: (err) => {
          loading.dismiss().then(() => {
            this.isLogin = false;
          this.authService.showAlert(err.error.message);
          });
        },
      })
  }

  singUp() {
    this.router.navigate(['sign-up']);
  }
  
  logIn() {
    this.router.navigate(['home']);
  }

  forgetPassword() {
    this.router.navigate(['forget-password']);
  }
}
