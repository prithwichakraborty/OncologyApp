import { Component } from '@angular/core';
import { NavController, List, Item, ItemSliding } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { HTTP, HTTPResponse } from '@ionic-native/http';

import { Custom_Overlay_Prov_Det } from '../modal/custom_overlay_prov_det';
import { TblProvider } from '../model/data/tblprovider';
import { DBAdapter } from '../model/dbadapter';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { JsonConvert, OperationMode, ValueCheckingMode, JsonObject } from "json2typescript"
import { GoalPage } from '../goal/goal';


@Component({
  selector: 'page-providers',
  templateUrl: 'providers.html'
})
export class ProvidersPage {

  listAllProvider: any = [];
  listHospital: any = [];
  listPathology: any = [];
  listClinic: any = [];

  allProviderData = [];//parent variable for storing all data


  //view controlling
  hideListAllProvider: boolean;
  hideListHospital: boolean;
  hideListPathology: boolean;
  hideListClinic: boolean;

  btnHospitalColor: string;
  btnPathologyColor: string;
  btnClinicColor: string;
  btnAllColor: string;


  txtSearchInput: string;


  user_id: number = 1; //test purpose


  dbadapter: DBAdapter;




  constructor(private modalCtrl: ModalController, private http: HTTP, private alertCtrl: AlertController, private callNumber: CallNumber, private navCtrl: NavController) {

    this.initiateView();
    this.loadData();



  }






  //general methods
  public showDetail(param_data: string) {

    try {
      this.navCtrl.push(Custom_Overlay_Prov_Det, { param_value: param_data });
     
    }
    catch (exp) {
      this.showDialog('Error', exp.message);
    }

  }


  private showDialog(_title: string, _message: string) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }

  private initiateView() {

    this.hideListHospital = true;
    this.hideListPathology = true;
    this.hideListClinic = true;
    this.hideListAllProvider = false;

    this.btnHospitalColor = "";
    this.btnPathologyColor = "";
    this.btnClinicColor = "";
    this.btnAllColor = "blue";

  }

  private loadData() {
    this.dbadapter = new DBAdapter(this.http, "", {}, {});
    this.dbadapter.getProviderData().then((respData: any) => {

      let jsonConvert: JsonConvert = new JsonConvert();
      let rawData: TblProvider[];
      this.allProviderData = [];

      this.listAllProvider = [];
      this.listHospital = [];
      this.listPathology = [];
      this.listClinic = [];


      try {

        let jsonObj: Object = JSON.parse(respData);
        rawData = jsonConvert.deserialize(jsonObj, TblProvider);

        rawData.forEach(element => {

          let items = new ProviderItems();
          items.Id = element.Id;
          items.Name = element.Name;
          items.Address = element.Address;
          items.Type = element.Type;
          items.Website = element.Website;
          items.Latitude = element.Latitude;
          items.Longitude = element.Longitude;


          //Global variable
          this.allProviderData.push(items);

          //adding into the list
          this.listAllProvider.push(items);



          if (element.Type == "hospital") {
            this.listHospital.push(items);
          }
          else if (element.Type == "pathology") {
            this.listPathology.push(items);
          }
          else if (element.Type == "clinic") {
            this.listClinic.push(items);
          }

        });

      }
      catch (e) {
        this.showDialog('Error', e.message);
      }

    });
  }







  //events
  private btnHospitalClicked() {

    this.hideListHospital = false;
    this.hideListPathology = true;
    this.hideListClinic = true;
    this.hideListAllProvider = true;

    this.btnHospitalColor = "blue";
    this.btnPathologyColor = "";
    this.btnClinicColor = "";
    this.btnAllColor = "";

  }

  private btnPathologyClicked() {

    this.hideListHospital = true;
    this.hideListPathology = false;
    this.hideListClinic = true;
    this.hideListAllProvider = true;

    this.btnHospitalColor = "";
    this.btnPathologyColor = "blue";
    this.btnClinicColor = "";
    this.btnAllColor = "";

  }

  private btnClinicalTeamClicked() {

    this.hideListHospital = true;
    this.hideListPathology = true;
    this.hideListClinic = false;
    this.hideListAllProvider = true;

    this.btnHospitalColor = "";
    this.btnPathologyColor = "";
    this.btnClinicColor = "blue";
    this.btnAllColor = "";

  }

  private btnAllClicked() {

    this.hideListHospital = true;
    this.hideListPathology = true;
    this.hideListClinic = true;
    this.hideListAllProvider = false;

    this.btnHospitalColor = "";
    this.btnPathologyColor = "";
    this.btnClinicColor = "";
    this.btnAllColor = "blue";

  }



  private onInput() {

  }

  private onCancel() {

  }

  private providerItemClicked(providerId: number) {

    let param_value: string = "";

    this.allProviderData.forEach(element => {
      if (providerId == element.Id) {
        param_value = "id="+ element.Id.toString() + "|name=" + element.Name.toString() + "|addr=" + 
        element.Address.toString() + "|web=" + element.Website.toString() + "|lat=" +
          element.Latitude.toString() + "|long=" + element.Longitude.toString();
      }
    });


    this.showDetail(param_value);

  }



}









//secondary data classes
class ProviderItems {

  private _Id: number;
  get Id(): number { return this._Id; }
  set Id(value: number) { this._Id = value; }

  private _Name: string;
  get Name(): string { return this._Name; }
  set Name(value: string) { this._Name = value; }

  private _Address: string;
  get Address(): string { return this._Address; }
  set Address(value: string) { this._Address = value; }

  private _Latitude: number;
  get Latitude(): number { return this._Latitude; }
  set Latitude(value: number) { this._Latitude = value; }

  private _Longitude: number;
  get Longitude(): number { return this._Longitude; }
  set Longitude(value: number) { this._Longitude = value; }

  private _Website: string;
  get Website(): string { return this._Website; }
  set Website(value: string) { this._Website = value; }

  private _Type: string;
  get Type(): string { return this._Type; }
  set Type(value: string) { this._Type = value; }


  /////
  private _Value: string;
  get Value(): string { return this._Value; }
  set Value(value: string) { this._Value = value; }
}