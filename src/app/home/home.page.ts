import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router'
import { MusicService } from '../services/music.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
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
  tracks: any;
  albums: any;
  localArtists: any;
  artists: any;
  song: any = {
    name: '',
    preview_url: '',
    playing: false  
  };
  currentSong: any = {};
  newTime: any;
  favorites: any[] = [];


  constructor(private storageService: StorageService, private router: Router, private musicService: MusicService, private modalCtrl: ModalController,) {}

  async ngOnInit() {
    await this.LoadStorageData();
    this.loadTracks();
    this.loadAlbums();
    this.loadArtists();
    this.getArtists();

    const favs = await this.storageService.get('favorites');
  if (favs) {
    this.favorites = favs;
  }

    const introVisto = await this.storageService.get('introVisto');
    if (!introVisto) {
    this.router.navigateByUrl('/intro');
    return;
  }

  await this.LoadStorageData();
  }

  async LoadStorageData(){
    const savedTheme = await this.storageService.get('theme')
    if (savedTheme){
      this.colorActual = savedTheme;
    }
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log(this.tracks, "las canciones")
    })
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log(this.albums, "los albums")
    })
  }

  async showSongs(albumId: string) {
    console.log("album id", albumId)
    const songs = await this.musicService.getSongsByAlbum(albumId)
    console.log("songs: ", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result)=>{
      if (result.data){
        console.log("cancion recibida ", result.data)
        this.song = result.data
      }
    })  
    modal.present();

  }

loadArtists() {
  this.musicService.getArtists().then(async (artists) => {

    const artistsWithSongs = [];

    for (let artist of artists) {
      const songs = await this.musicService.getSongsByArtist(artist.id);

      if (songs.length > 0) {
        artistsWithSongs.push(artist);
      }
    }

    this.artists = artistsWithSongs;

  });
}


async showSongsByArtist(artistId: number) {
  const songs = await this.musicService.getSongsByArtist(artistId);

  const modal = await this.modalCtrl.create({
    component: SongsModalPage,
    componentProps: {
      songs: songs
    }
  });

  modal.onDidDismiss().then((result) => {
    console.log("Modal cerrado", result);

    if (result.data) {
      console.log("Canción recibida:", result.data);
      this.song = result.data;
    }
  });

  await modal.present();
}


getArtists() {
  this.musicService.getArtists().then(artists => {
    console.log("ARTISTAS COMPLETOS:", artists);
    this.artists = artists;
  });
}

play() {
  this.currentSong = new Audio(this.song.preview_url);
  this.currentSong.play();
  this.currentSong.addEventListener("timeupdate", ()=>{
    this.newTime = this.currentSong.currentTime / this.currentSong?.duration;
  })
  this.song.playing = true;
}

pause() {
  this.currentSong.pause();
  this.song.playing = false;
}

formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds/60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} `
}

getRemainingTime(){
  if (!this.currentSong?.duration || !this.currentSong?.currentTime){
    return 0;
  }
  return this.currentSong.duration - this.currentSong.currentTime;
}

async toggleFavorite(song: any) {
  const index = this.favorites.findIndex(f => f.id === song.id);

  if (index >= 0) {
    this.favorites.splice(index, 1);
    song.favorite = false;
  } else {
    song.favorite = true;
    this.favorites.push(song);
  }

  await this.storageService.set('favorites', this.favorites);
}

isFavorite(song: any): boolean {
  return this.favorites.some(f => f.id === song.id);
}

goFavorites(){
  this.router.navigateByUrl('/favorites');
}


}

