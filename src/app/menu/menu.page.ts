import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule,]
})
export class MenuPage implements OnInit {

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController,
    private menu: MenuController) { }

  ngOnInit() {
  }

  goToIntro(){
  console.log("ir hacia la intro")
  }

  async logout() {
  await this.storageService.remove('login');
  this.navCtrl.navigateRoot('/login');
}

  closeMenu(){
    this.menu.close();
  }
}
