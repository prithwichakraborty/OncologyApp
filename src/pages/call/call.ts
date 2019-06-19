import { Component } from '@angular/core';
import { NavController, List, Item, ItemSliding } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { TblSymptom } from '../model/data/tblsymptom';
import { SymptomItems } from '../model/data/symptomitems';
import {Custom_Overlay} from '../modal/custom_overlay';
import {DBAdapter} from '../model/dbadapter';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { JsonConvert, OperationMode, ValueCheckingMode, JsonObject } from "json2typescript"


@Component({
  selector: 'page-call',
  templateUrl: 'call.html'
})
export class CallPage {

  genSymptomItems = [];
  bmitSymptomItems = [];
  listSymptom = [];

  constructor(private modalCtrl: ModalController, private http: HTTP, private alertCtrl: AlertController, private callNumber: CallNumber, private navCtrl: NavController) {
    
    
    let uri:string = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetSymptomInfo"; 
    let adapter = new DBAdapter(http, uri, {}, {});
    //Parsing data from json response

    adapter.getSymptomData().then((respData: any) => {

      let jsonConvert: JsonConvert = new JsonConvert();
      let rawData: TblSymptom[];
      

      try {
        
        let jsonObj: Object = JSON.parse(respData);
        rawData = jsonConvert.deserialize(jsonObj, TblSymptom);

        rawData.forEach(element => {
          let items = new SymptomItems();
          items.Id = element.Id; //id
          items.Value = element.Symptom; //symptom
          items.Type = element.Type; //type
          items.Detail = element.Detail; //detail

          //Addind symptom data into a global variable
          this.listSymptom.push(items);
          

          if(element.Type == "general") {
            this.genSymptomItems.push(items);
          }
          else if(element.Type == "bmit"){
            this.bmitSymptomItems.push(items);
          }
          
        });

      }
      catch (e) {
        this.showDialog('Error', e.message);
      }

    });

  }


  //Get symptom data from web service
/*   private getSymptomData() {


    // responseData = this.http.get('https://oncologyappservice.azurewebsites.net/WebService.asmx/GetSymptomInfo', {}, {})
    //   .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

    return this.http.get('https://oncologyappservice.azurewebsites.net/WebService.asmx/GetSymptomInfo', {}, {})
      .then(resp => {

        
        return resp.data;
      });
  } */




  //Show dialouge
  private showDialog(_title: string, _message: string) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }

  public showDetail(param_data: string){
    
    try {
      //const modalPage = this.modalCtrl.create(Custom_Overlay, {param_value: 'test'});
      //modalPage.present();
      this.navCtrl.push(Custom_Overlay, {param_value: param_data});
    }
    catch(exp) {
      this.showDialog('Error', exp.message);
    }
    
}


  //// ---- Events ----
  private genSympItemSelected(gItem: number) {
    
    this.listSymptom.forEach(element => {
      if(element.Id == gItem) {
        this.showDetail(element.Detail);
      }
    });
  }

  private bmitSympItemSelected(bItem: number) {
    //this.showDialog(bItem.toString());
    
  }

  //Call into the emergency phone number
  private btn_call_emrg_clicked() {
    this.callNumber.callNumber("000", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //Call into the general phone number
  private btn_call_gen_clicked() {
    this.callNumber.callNumber("0730682010", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }


}

