import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FavoritesPage implements OnInit {

  favorites: any[] = [];

  constructor(private storage: StorageService, private router: Router) {}

  async ngOnInit() {
    this.favorites = await this.storage.get('favorites') || [];
  }

  goBack() {
    this.router.navigate(['/menu/home']);
  }
}

