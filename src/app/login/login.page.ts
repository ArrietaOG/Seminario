import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  errorMessage: string = "";

  mostrarPassword = false;

  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio." },
      { type: "email", message: "Verifica tu email." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." },
      { type: "minlength", message: "La contraseña debe tener mínimo 6 caracteres." }
    ],
  };

    togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private nvCrtl: NavController,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
addIcons({ eye, eyeOff });
  }

  ngOnInit() {}

async loginUser() {

  const credentials = this.loginForm.value;

  const user = await this.storageService.get('user');
  console.log("Usuario guardado:", user);
  console.log("Credenciales:", credentials);

  if (!user) {
    this.errorMessage = "No hay usuario registrado";
    return;
  }

  if (
    user.email === credentials.email &&
    user.password === credentials.password
  ) {
    await this.storageService.set('login', true);
    this.nvCrtl.navigateForward('/intro');
  } else {
    this.errorMessage = "Email o contraseña incorrectos";
  }
}


goToRegister() {
  this.nvCrtl.navigateForward('/register');
}
async ionViewWillEnter() {
  const user = await this.storageService.get('user');
  console.log('Usuario en storage:', user);
  
}




}
