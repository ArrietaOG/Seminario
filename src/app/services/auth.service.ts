import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storage: StorageService) {}

  loginUser(credentials: any): Promise<string> {
    return new Promise((accept, reject) => {
      if (
        credentials.email === "felipearrieta2003@gmail.com" &&
        credentials.password === "123456789"
      ) {
        accept("login correcto");
      } else {
        reject("login incorrecto");
      }
    });
  }
  
async registerUser(data: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (data.email && data.password) {

      const users = (await this.storage.get('users')) || [];

      users.push(data);

      await this.storage.set('users', users);

      resolve('Registro exitoso');
    } else {
      reject('Error en el registro');
    }
  });
}


}
