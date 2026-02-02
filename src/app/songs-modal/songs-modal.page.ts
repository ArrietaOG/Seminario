import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SongsModalPage implements OnInit {

  songs: any;
  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs']
    console.log("recibi: ", this.songs)
  }

}
