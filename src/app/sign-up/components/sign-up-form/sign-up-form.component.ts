import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SignUpFormComponent  implements OnInit {

  public form!: FormGroup;
  private navController = inject(NavController)
  private signUpService = inject(SignUpService);
  private loadingCtrl = inject(LoadingController)

  constructor(
    private router: Router
  ) { 
    this.initForm();

    addIcons({
      mailOutline,
      lockClosedOutline,
      personOutline
    });
  }

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
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
    this.signUp();
  }

  async signUp() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      translucent: true
    });

    await loading.present();
    
    const signUpData = { 
      name:this.form.value.name, 
      email: this.form.value.email, 
      password: this.form.value.password 
    }

    this.signUpService
      .signUp(signUpData)
      .pipe(
        delay(1000)
      )
      .subscribe({
        next: (res) => {
          if (res.success == 1) {
            loading.dismiss().then(() => {
              this.signUpService.navigateByUrl('login');
              this.form.reset();
            });
          }
        },
        error: (err) => {
          let errorHeader = err.error.message
          let errorMessage = this.formatErrors(err.error.errors);

          loading.dismiss().then(() => {   
              this.signUpService.showAlert( errorHeader , errorMessage);
          });
        },
      })
  }
  
  formatErrors(errors: { [key: string]: string[] }): string {
    let errorMessages = '';
    if (errors) {
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessages += errors[key].join(' ') + '\n';
        }
      }
    }
    return errorMessages;
  }

  backToLogin() {
    this.navController.navigateBack('login')
  }

}
