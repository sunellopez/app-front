import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ForgetPasswordFormComponent } from "../../components/forget-password-form/forget-password-form.component";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ForgetPasswordFormComponent]
})
export class ForgetPasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
