import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { eye, eyeOff } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegisterPage {

  registerForm: FormGroup;
  errorMessage = '';

  validation_messages = {
    nombre: [{ type: 'required', message: 'El nombre es obligatorio' }],
    apellido: [{ type: 'required', message: 'El apellido es obligatorio' }],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Email inválido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'Mínimo 6 caracteres' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
addIcons({ eye, eyeOff });
  }

async registerUser() {
  console.log(this.registerForm.value);
  console.log(this.registerForm.valid);

  if (this.registerForm.invalid) return;

    this.authService.registerUser(this.registerForm.value)
      .then(async () => {
        await this.storageService.set('user', this.registerForm.value);
        
        const user = await this.storageService.get('user');
        console.log('Usuario guardado:', user);

        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.errorMessage = err;
      });
  }

  mostrarPassword = false;

togglePassword() {
  this.mostrarPassword = !this.mostrarPassword;
}

goToLogin() {
    this.navCtrl.navigateBack('/login');
  }


}
