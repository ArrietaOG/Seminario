import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  urlServer= "https://music.fly.dev";
  constructor() {}

  getTracks() {
    return fetch(`${this.urlServer}/tracks`).then(
      response => response.json()
    );

  }
  getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(
    response => response.json()
  );
}


  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    );
  }

getArtists() {
  return fetch(`${this.urlServer}/artists`)
    .then(res => res.json());
}

getSongsByArtist(artistId: number) {
  return fetch(`${this.urlServer}/tracks/artist/${artistId}`)
    .then(res => res.json());
}



  
  }

  

