import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { JsonConvert } from 'json2typescript';
import { DBAdapter } from '../model/dbadapter'; 
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-sspedi',
  templateUrl: 'sspedi.html'
})
export class SSPedi {

  isBtnSubmitVisible: boolean;
  isBtnPrevVisible:boolean;
  isBtnNextVisible:boolean;
  lblComplete: any;
  lblQuestion: any;

  currentPage: number;
  maxPage: number = 3;
  sliderValue: any;
  questionnaire: Array<string> = ["Feeling disappointed or sad", "Feeling scared or woried", "Feeling cranky or angry"];
  pointSelected: Array<number> = new Array<number>(this.maxPage);

  dbadapter:DBAdapter;
  date_key_name:string = "daily_rating_record_date";



  constructor(private storage: Storage, private navCtrl: NavController, private alertCtrl: AlertController, private http: HTTP) {
    this.initiateView();

    //check if rating already exists for today
    let currentDate:string = new Date().toLocaleDateString();
    
    storage.clear(); // for testing purpose
    storage.get(this.date_key_name).then((val) => {

      if(val == currentDate) {
        this.isBtnPrevVisible = false;
        this.isBtnNextVisible = false;
      }

    });
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

  private initiateView() {

    this.currentPage = 1; //used as index
    this.lblComplete = "Complete: " + this.currentPage.toString() + "/" + this.maxPage.toString();

    this.lblQuestion = this.questionnaire[this.currentPage - 1]; //default value
    this.isBtnSubmitVisible = false;
    this.isBtnPrevVisible = true;
    this.isBtnNextVisible = true;

    for (let i=0; i<this.maxPage; i++){
      this.pointSelected[i] = 0;//default value = 0, no point selected
    }

    this.sliderValue = 1;

  }







  //Events
  private btnPrevClicked() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.lblComplete = "Complete: " + this.currentPage.toString() + "/" + this.maxPage.toString();
      this.isBtnSubmitVisible = false;


      //showing previous fragment
      this.lblQuestion = this.questionnaire[this.currentPage - 1];
      if (this.pointSelected[this.currentPage - 1] == 0){
        this.sliderValue = 1;
      }
      else {
        this.sliderValue = this.pointSelected[this.currentPage - 1];
      }

    }

  }

  private btnNextClicked() {

    if (this.currentPage < this.maxPage) {
      this.currentPage += 1;
      this.lblComplete = "Complete: " + this.currentPage.toString() + "/" + this.maxPage.toString();

      //showing next fragment
      this.lblQuestion = this.questionnaire[this.currentPage - 1];


      if (this.pointSelected[this.currentPage - 1] == 0) {
        this.sliderValue = 1;
      }
      else {
        this.sliderValue = this.pointSelected[this.currentPage - 1];
      }

    }

    if (this.currentPage == this.maxPage) {
      this.isBtnSubmitVisible = true;
    }
    else {
      this.isBtnSubmitVisible = false;
    }

  }

  private rngPointChanged(event) {
    this.pointSelected[this.currentPage - 1] = event.value;
  }

  private btnSubmitClicked() {

    var headers = {
      'Content-Type': 'application/json'
    }

    var postData = {
      'user_id' : 1,
      'disappointed': this.pointSelected[0],
      'scared': this.pointSelected[1],
      'cranky': this.pointSelected[2]
    } 
    
    this.dbadapter = new DBAdapter(this.http, "https://oncologyappservice.azurewebsites.net/WebService.asmx/SaveDailyRating", postData, headers);

    this.dbadapter.saveDailyRating().then((respData: any) => {

      var temp = JSON.parse(respData);

      

      if (temp == "Success") {
        this.initiateView();
        this.isBtnPrevVisible = false;
        this.isBtnNextVisible = false;
        this.showDialog("Confirmation", "Data successfully saved");

        //save into local storage
        let currentDate:string = new Date().toLocaleDateString();
        this.storage.set(this.date_key_name, currentDate);
      }
      else if (temp == "Duplicate") {
        this.initiateView();
        this.isBtnPrevVisible = false;
        this.isBtnNextVisible = false;

        //save into local storage
        let currentDate:string = new Date().toLocaleDateString();
        this.storage.set(this.date_key_name, currentDate);

        
        this.showDialog("Duplicate", "You already enterted data for today");
      } 
      else {
        this.showDialog("Error", temp);
      } 

    });
  }

}



