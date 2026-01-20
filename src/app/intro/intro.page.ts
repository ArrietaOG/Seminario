import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router'
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule, FormsModule,]
})
export class IntroPage implements OnInit {

  colorActual: string = 'color-base';

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    await this.LoadStorageData();
  }

  async LoadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  goBack() {
    console.log("Guardando, intro visto");
    this.storageService.set('introVisto', true);
    this.router.navigateByUrl('/home');
  }
}
