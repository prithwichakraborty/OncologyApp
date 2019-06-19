import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { JsonConvert } from 'json2typescript';
import { DBAdapter } from '../model/dbadapter'; 
import { Storage } from '@ionic/storage';
import { SspediRating } from '../sspedirating/sspedirating';
import { BloodResult } from '../bloodresult/bloodresult';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {





  constructor(private storage: Storage, private navCtrl: NavController, private alertCtrl: AlertController, private http: HTTP) {
    
  }



  //General methods
  private showDialog(_title: string, _message: string) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }



  //Events

  private showDailyRatingPage() {
    this.navCtrl.push(SspediRating);
  }

  private showBloodResultPage() {
    this.navCtrl.push(BloodResult);
  }



}



