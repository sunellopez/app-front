import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class ForgetPasswordFormComponent  implements OnInit {

  public form!: FormGroup;
  private navController = inject(NavController)

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

  backToLogin() {
    this.navController.navigateBack('login')
  }
}
