import { Component } from '@angular/core';
import { NavController, List, Item, ItemSliding } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { HTTP, HTTPResponse } from '@ionic-native/http';

import {Custom_Overlay_Add_Goal} from '../modal/custom_overlay_add_goal';
import { DBAdapter } from '../model/dbadapter';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { JsonConvert, OperationMode, ValueCheckingMode, JsonObject } from "json2typescript"
import { TblWebsite } from '../model/data/tblwebsite';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'page-website',
  templateUrl: 'website.html'
})
export class WebSite {

  listWebItems = [];
  

  dbadapter: DBAdapter;

  constructor(private iab: InAppBrowser, private modalCtrl: ModalController, private http: HTTP, private alertCtrl: AlertController, private callNumber: CallNumber, private navCtrl: NavController) {

    //POST data
    this.loadData();


  }






  //general methods
  public loadData() {

    this.dbadapter = new DBAdapter(this.http, "", {}, {});

    this.listWebItems = [];

    this.dbadapter.getWebsiteData().then((respData: any) => {

      let jsonConvert: JsonConvert = new JsonConvert();
      let rawData: TblWebsite[];

      try {

        let jsonObj: Object = JSON.parse(respData);
        rawData = jsonConvert.deserialize(jsonObj, TblWebsite);

        rawData.forEach(element => {
          let items = new GoalItems();
          items.Id = element.Id;
          items.Website = element.Website;
          items.Url = element.Url;

          //Adding goal data into a global variable
          this.listWebItems.push(items);


        });

      }
      catch (e) {
        this.showDialog('Error', e.message);
      }

    });


  }

  private showDialog(_title: string, _message: string) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }






  //events
  private goToWebSite(url:string) {
    const browser = this.iab.create(url);
    browser.show();
  }


}


//secondary classes
class GoalItems {

  private _Id: number;
  get Id(): number { return this._Id; }
  set Id(value: number) { this._Id = value; }

  private _Website: string;
  get Website(): string { return this._Website; }
  set Website(value: string) { this._Website = value; }

  private _Url: string;
  get Url(): string { return this._Url; }
  set Url(value: string) { this._Url = value; }

}