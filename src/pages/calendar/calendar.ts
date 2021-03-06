import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Dropbox } from '../clients/dropboxService';
 
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
 
  depth: number = 0;
  folders: any;
 
  constructor(public navCtrl: NavController, public dropbox: Dropbox, public Loading: LoadingController) {
 
  }
 
  ionViewDidLoad(){
 
      this.dropbox.setAccessToken("vSWm2_Qnc1IAAAAAAAAOrliJEIDiA7VJNsm-XIqKhn5cCS9nht5jdBcm9xvyS7uB");
      this.folders = [];
 
      let loading = this.Loading.create({
        content: 'Syncing from Dropbox...'
      });
 
      loading.present();
 
      this.dropbox.getFolders().subscribe(data => {
        this.folders = data.entries;
        loading.dismiss();
      }, (err) => {
        console.log(err);
      });
 
  }
 
  openFolder(path){
 
    let loading = this.Loading.create({
      content: 'Syncing from Dropbox...'
    });
 
    loading.present();
 
    this.dropbox.getFolders(path).subscribe(data => {
      this.folders = data.entries;
      this.depth++;
      loading.dismiss();
    }, err => {
      console.log(err);
    });
 
  }
 
  goBack(){
 
    let loading = this.Loading.create({
      content: 'Syncing from Dropbox...'
    });
 
    loading.present();
 
    this.dropbox.goBackFolder().subscribe(data => {
      this.folders = data.entries;
      this.depth--;
      loading.dismiss();
    }, err => {
      console.log(err);
    });
 
}
 
}