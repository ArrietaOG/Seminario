import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,CommonModule, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
coloruno = 'var(--color-uno)';
colordos = 'var(--color-dos)';
colorActual = this.coloruno;

  genres = [
    {
      title: "Musica clasica",
      image: "https://wallpapers.com/images/featured/musica-clasica-a58kbdl0oe9y9hxf.jpg",
      description: "La música clásica es una tradición artística que abarca más de mil años de historia occidental. Se caracteriza por su complejidad estructural, el uso de notación musical precisa y su instrumentación orquestal.",
    },
        {
      title: "Musica Vallenato",
      image: "https://ojopelaomagazine.co/wp-content/uploads/2023/03/CUELLO-GAMEZ.jpg",
      description: "El vallenato es un género musical folclórico autóctono de la Costa Caribe colombiana, reconocido por la UNESCO como patrimonio inmaterial, que fusiona la lírica española, la percusión africana y la gaita indígena. Se caracteriza por el uso de tres instrumentos principales: acordeón diatónico (europeo), caja (africana) y guacharaca (indígena). ",
    },
        {
      title: "Musica Salsa",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFRDmMZABkCdFMPOiPLHOiWwUe4tfOcJNLfDLJI-vDP79aS3DlTYiikJh32YvWfmPX57-B17-1zWakl9-yaqpwOVNIGqryWUANCagZtQJR_B_MVkwETQ55VwzDApiMAbLEusXePIAeGfWV/s1600/salsa.jpg",
      description: "La salsa es un género musical bailable, popularizado en Nueva York en los años 60/70, que fusiona ritmos afrocubanos (son, mambo, guaracha, son montuno) con jazz y elementos puertorriqueños. Se caracteriza por su compás de 4/4, percusión intensa (congas, bongó, timbales), piano, metales y letras sobre vida, amor y cultura caribeña. ",
    }
  ]

async cambiarcolor() {
  this.colorActual = this.colorActual === this.coloruno ? this.colordos : this.coloruno;
  await this.storageService.set('theme', this.colorActual)
  console.log('Tema guardado: ', this.colorActual)



  }
  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    await this.LoadStorageData();
    const introVisto = await this.storageService.get('introVisto');
    if (!introVisto) {
    this.router.navigateByUrl('/intro');
    return;
    this.simularCargaDatos();
  }

  await this.LoadStorageData();
  }

  async LoadStorageData(){
    const savedTheme = await this.storageService.get('theme')
    if (savedTheme){
      this.colorActual = savedTheme;
    }
  }

    goBack(){
    console.log("Ir al intro")
    this.router.navigateByUrl('/intro')
  }

  async simularCargaDatos() {
  const data = await this.obtenerDatoSimulados();
  console.log('Datos simulados: ', data)
}

obtenerDatoSimulados(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve (['Rock', 'Vallenato', 'Trap'])
    }, 1500)
  })
}

verIntro() {
    this.router.navigateByUrl('/intro');
  }


  }

