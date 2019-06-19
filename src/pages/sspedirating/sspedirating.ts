import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { JsonConvert } from 'json2typescript';
import { DBAdapter } from '../model/dbadapter'; 
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { TblSspedi } from '../model/data/tblsspedi';

@Component({
  selector: 'page-sspedirating',
  templateUrl: 'sspedirating.html'
})
export class SspediRating {
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  

  allSSpediData = [];

  chartData_disappoint = [];
  chartData_scared = [];
  chartData_cranky = [];
  x_label_day = [];
  x_label_month = [];
  x_label_year = [];
  day:string[] = [];

  user_id = 1;

  dbadapter: any;


  constructor(private storage: Storage, private navCtrl: NavController, private alertCtrl: AlertController, private http: HTTP) {
    
    
  }


/*   ionViewDidLoad() {

 

    let t = [21, 20, 25, 23, 28, 24, 21];//this.chartData_disappoint[7];

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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

    
    

  } */




  //General methods

  private loadData() {

    this.dbadapter = new DBAdapter(this.http, "", {}, {});
    
    this.dbadapter.getDailyRaiting(this.user_id).then((respData: any) => {

      let jsonConvert: JsonConvert = new JsonConvert();
      let rawData: TblSspedi[];
      this.allSSpediData = [];
      this.chartData_disappoint = [];
      this.chartData_scared = [];
      this.chartData_cranky = [];
      this.x_label_day = [];
      this.x_label_month = [];
      this.x_label_year = [];


      

      try {

        let jsonObj: Object = JSON.parse(respData);
        rawData = jsonConvert.deserialize(jsonObj, TblSspedi);

        let count:number = 0;
        
        rawData.forEach(element => {

          let items = new SspediItems();
          items.Id = element.Id;
          items.Date = element.Date;
          items.Disappointed = element.Disappointed;
          items.Scared = element.Scared;
          items.Cranky = element.Cranky;


          this.chartData_disappoint.push(element.Disappointed);
          this.chartData_scared.push(element.Scared);
          this.chartData_cranky.push(element.Cranky);

          
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
    
    let temp = this.chartData_disappoint;
    let t = [temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6]];//this.chartData_disappoint[7];

    let temp2 = this.day;

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: [temp2[0], temp2[1], temp2[2], temp2[3], temp2[4], temp2[5], temp2[6]],
        //labels: [this.day[0], this.day[1], this.day[2], this.day[3], this.day[4], this.day[5], this.day[6]],
        datasets: [
          {
            label: "Feeling Disappointed",
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

class SspediItems {

  private _Id: number;
  get Id(): number { return this._Id; }
  set Id(value: number) { this._Id = value; }

  private _Date: string;
  get Date(): string { return this._Date; }
  set Date(value: string) { this._Date = value; }

  private _Day: string;
  get Day(): string { return this._Day; }
  set Day(value: string) { this._Day = value; }

  private _Disappointed: number;
  get Disappointed(): number { return this._Disappointed; }
  set Disappointed(value: number) { this._Disappointed = value; }

  private _Scared: number;
  get Scared(): number { return this._Scared; }
  set Scared(value: number) { this._Scared = value; }

  private _Cranky: number;
  get Cranky(): number { return this._Cranky; }
  set Cranky(value: number) { this._Cranky = value; }


}