import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {

  colorActual = 'color-base';

  genres = [
    {
      title: 'Bienvenidos',
      image: 'https://img.freepik.com/vector-premium/icono-plantilla-diseno-degradado-logotipo-astronauta-musica_442940-970.jpg?semt=ais_hybrid&w=740&q=80',
      description: 'A la mejor aplicacion de musica de todos los tiempos.'
    },
    {
      title: '',
      image: 'https://planetaviola.com/wp-content/uploads/2020/09/maxresdefault_0.jpg',
      description: 'Crea o guarda con la mejor calidad tus playList para poder escuchar en cualquier momento y en cualquier lugar.'
    },
    {
      title: 'Configua',
      image: 'https://cdn-icons-png.freepik.com/256/889/889744.png?semt=ais_white_label',
      description: 'Todo a tu medida.'
    },
    {
      title: 'Disfruta',
      image: '',
      description: 'Explora todos los géneros disponibles.'
    }
  ];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    const theme = await this.storageService.get('theme');
    if (theme) {
      this.colorActual = theme;
    }
  }

  goBack() {
    this.storageService.set('introVisto', true);
    this.router.navigateByUrl('menu/home');
  }
}
