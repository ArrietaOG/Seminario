import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validation_messages = {
    email: [
      {
        type: "required", message: "El email es obligatorio."
      },
      {
        type: "email", message: "Verifica tu email."
      }
    ],
    password: [
      {
        type: "required", message: "La contraseña es obligatoria."
      },
      {
        type: "minlength", message: "La contraseña debe tener minimo 6 caracteres."
      }
    ],
  }

  constructor(private fromBuilder: FormBuilder) { 
    this.loginForm = this.fromBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])
      )
    })
  }

  ngOnInit() {
  }

  loginUser(credentials: any){
    console.log(credentials)
  }

}
