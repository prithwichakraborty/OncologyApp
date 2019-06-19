import { Component } from '@angular/core';
import { NavController, List, Item, ItemSliding } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { HTTP, HTTPResponse } from '@ionic-native/http';

import {Custom_Overlay_Add_Goal} from '../modal/custom_overlay_add_goal';
import { TblGoal } from '../model/data/tblgoal';
import { DBAdapter } from '../model/dbadapter';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { JsonConvert, OperationMode, ValueCheckingMode, JsonObject } from "json2typescript"


@Component({
  selector: 'page-goal',
  templateUrl: 'goal.html'
})
export class GoalPage {

  btnCompleteGoalColor: string;
  btnIncompleteGoalColor: string;
  isCompGoalShown: boolean;
  isIncompGoalShown: boolean;

  listCompGoals = [];
  listIncompGoals = []; //it actually lists all goals
  allGoalData = [];

  user_id:number = 1;


  dbadapter: DBAdapter;

  constructor(private modalCtrl: ModalController, private http: HTTP, private alertCtrl: AlertController, private callNumber: CallNumber, private navCtrl: NavController) {

    //POST data
    this.loadData(this.user_id);
    this.initiateView();


  }






  //general methods
  public loadData(userId: number) {

    this.dbadapter = new DBAdapter(this.http, "", {}, {});

    this.allGoalData = [];
    this.listCompGoals = [];
    this.listIncompGoals = [];

    this.dbadapter.getGoalData(userId).then((respData: any) => {

      let jsonConvert: JsonConvert = new JsonConvert();
      let rawData: TblGoal[];

      try {

        let jsonObj: Object = JSON.parse(respData);
        rawData = jsonConvert.deserialize(jsonObj, TblGoal);

        rawData.forEach(element => {
          let items = new GoalItems();
          items.Id = element.Id;
          items.Goal = element.Goal;
          items.Complete = element.Complete;
          items.CompletionDate = element.CompletionDate;
          items.DateCompleted = element.DateCompleted;

          //Adding goal data into a global variable
          this.allGoalData.push(items);


          if (element.Complete == 1) { //complete goals
            let temp: string[] = element.DateCompleted.split(' ');
            items.Date = temp[0];
            items.IsChecked = true;

            this.listCompGoals.push(items);

            this.listIncompGoals.push(items); //this is list of all goals
          }
          else if (element.Complete == 0) { //incomplete goals
            let temp: string[] = element.CompletionDate.split(' ');
            items.Date = temp[0];
            items.IsChecked = false;

            this.listIncompGoals.push(items);
          }




        });

      }
      catch (e) {
        this.showDialog('Error', e.message);
      }

    });


  }

  private initiateView() {
    this.btnCompleteGoalColor = "blue";
    this.btnIncompleteGoalColor = "";

    this.isCompGoalShown = true;
    this.isIncompGoalShown = false;

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
  private btnCompleteClicked() {
    this.btnCompleteGoalColor = "blue";
    this.btnIncompleteGoalColor = "";

    this.isCompGoalShown = true;
    this.isIncompGoalShown = false;
  }

  private btnIncompleteClicked() {
    this.btnCompleteGoalColor = "";
    this.btnIncompleteGoalColor = "blue";

    this.isCompGoalShown = false;
    this.isIncompGoalShown = true;
  }

  private compGoalItemSelected(goalId: number) {

    this.dbadapter = new DBAdapter(this.http, "", {}, {});
    this.dbadapter.changeGoalToIncomlete(goalId).then((respData: any) => {
      var temp = JSON.parse(respData); //"Success"
    });

    this.loadData(this.user_id);

  }

  private incompGoalItemSelected(goalId: number) {

    this.dbadapter = new DBAdapter(this.http, "", {}, {});
    this.dbadapter.changeGoalToComplete(goalId).then((respData: any) => {
      var temp = JSON.parse(respData); //"Success"
    });

    this.loadData(this.user_id);
  }

  private btnNewGoalClicked() {

    var param_data:string = this.user_id.toString();

    try {

      this.navCtrl.push(Custom_Overlay_Add_Goal, {param_value: param_data}).then(() => {
        this.navCtrl.getActive().onDidDismiss( data => {
          this.loadData(this.user_id);
        });
      });


    }
    catch(exp) {
      this.showDialog('Error', exp.message);
    }
  }

}









//secondary classes
class GoalItems {

  private _Id: number;
  get Id(): number { return this._Id; }
  set Id(value: number) { this._Id = value; }

  private _Goal: string;
  get Goal(): string { return this._Goal; }
  set Goal(value: string) { this._Goal = value; }

  private _CompletionDate: string;
  get CompletionDate(): string { return this._CompletionDate; }
  set CompletionDate(value: string) { this._CompletionDate = value; }

  private _Complete: number;
  get Complete(): number { return this._Complete; }
  set Complete(value: number) { this._Complete = value; }

  private _IsChecked: boolean;
  get IsChecked(): boolean { return this._IsChecked; }
  set IsChecked(value: boolean) { this._IsChecked = value; }



  private _DateCompleted: string;
  get DateCompleted(): string { return this._DateCompleted; }
  set DateCompleted(value: string) { this._DateCompleted = value; }

  private _Date: string;
  get Date(): string { return this._Date; }
  set Date(value: string) { this._Date = value; }

}