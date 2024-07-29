import { Component, inject, OnInit} from '@angular/core';
import { IonicModule, NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline} from 'ionicons/icons'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
    console.log(this.form.value);
    this.login();
  }

  login() {
    this.isLogin = true;
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .then((data) => {
        console.log(data);
        if (data?.success == 1) {
          this.authService.navigateByUrl('/home');
          this.isLogin = false;
          this.form.reset();
        } else {
          this.isLogin = false;
          this.authService.showAlert(data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        this.isLogin = false;
        this.authService.showAlert(e?.error?.message);
      });
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
