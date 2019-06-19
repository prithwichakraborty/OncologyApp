import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { JsonConvert } from 'json2typescript';
import { DBAdapter } from '../model/dbadapter'; 
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { TblBloodResult } from '../model/data/tblbloodresult';

@Component({
  selector: 'page-bloodresult',
  templateUrl: 'bloodresult.html'
})
export class BloodResult {
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  

  allSSpediData = [];

  chartData_platelets = [];
  chartData_neutrophils = [];
  chartData_hb = [];
  x_label_day = [];
  x_label_month = [];
  x_label_year = [];
  day:string[] = [];

  user_id = 1;

  dbadapter: any;


  constructor(private storage: Storage, private navCtrl: NavController, private alertCtrl: AlertController, private http: HTTP) {
    
    
  }

  


  //General methods

  private loadData() {

    this.dbadapter = new DBAdapter(this.http, "", {}, {});
    
    this.dbadapter.getDailyRaiting(this.user_id).then((respData: any) => {

      let jsonConvert: JsonConvert = new JsonConvert();
      let rawData: TblBloodResult[];
      this.allSSpediData = [];
      this.chartData_platelets = [];
      this.chartData_neutrophils = [];
      this.chartData_hb = [];
      this.x_label_day = [];
      this.x_label_month = [];
      this.x_label_year = [];


      

      try {

        let jsonObj: Object = JSON.parse(respData);
        rawData = jsonConvert.deserialize(jsonObj, TblBloodResult);

        let count:number = 0;
        
        rawData.forEach(element => {

          let items = new BloodResItems();
          items.Id = element.Id;
          items.Wcc = element.Wcc;
          items.Weight = element.Weight;
          items.Height = element.Height;
          items.Neutrophils = element.Neutrophils;
          items.Platelets = element.Platelets;
          items.Hb = element.Hb;
          items.Date = element.Date;
          items.Day = element.Day;


          this.chartData_platelets.push(element.Platelets);
          this.chartData_neutrophils.push(element.Neutrophils);
          this.chartData_hb.push(element.Hb);

          
          let datetime_data = element.Date.split('-');
          this.x_label_day.push(datetime_data[0]);
          this.x_label_month.push(datetime_data[1]);
          this.x_label_year.push(datetime_data[2]);


          this.day[count] = element.Day;
          count++;

          //Global variable
          this.allSSpediData.push(items);


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
  private btn_update_graph() {


    this.loadData();
    
    let temp = this.chartData_platelets;
    let t = [temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6]];//this.chartData_disappoint[7];

    let temp2 = this.day;

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: [temp2[0], temp2[1], temp2[2], temp2[3], temp2[4], temp2[5], temp2[6]],
        //labels: [this.day[0], this.day[1], this.day[2], this.day[3], this.day[4], this.day[5], this.day[6]],
        datasets: [
          {
            label: "Platelets",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,198,198,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,198,198,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,198,198,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: t,
            spanGaps: false,
          }
        ]
      }

    });


  }



}



//secondary data classes

class BloodResItems {

  private _Id: number;
  get Id(): number { return this._Id; }
  set Id(value: number) { this._Id = value; }

  private _Wcc: number;
  get Wcc(): number { return this._Wcc; }
  set Wcc(value: number) { this._Wcc = value; }

  private _Neutrophils: number;
  get Neutrophils(): number { return this._Neutrophils; }
  set Neutrophils(value: number) { this._Neutrophils = value; }

  private _Weight: number;
  get Weight(): number { return this._Weight; }
  set Weight(value: number) { this._Weight = value; }

  private _Height: number;
  get Height(): number { return this._Height; }
  set Height(value: number) { this._Height = value; }

  private _Hb: number;
  get Hb(): number { return this._Hb; }
  set Hb(value: number) { this._Hb = value; }


  private _Platelets: number;
  get Platelets(): number { return this._Platelets; }
  set Platelets(value: number) { this._Platelets = value; }

  private _Date: string;
  get Date(): string { return this._Date; }
  set Date(value: string) { this._Date = value; }


  private _Day: string;
  get Day(): string { return this._Day; }
  set Day(value: string) { this._Day = value; }

}