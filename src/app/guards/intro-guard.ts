import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {

    const introVisto = await this.storageService.get('introVisto');

    if (introVisto) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
      return false;
    }
  }
}
