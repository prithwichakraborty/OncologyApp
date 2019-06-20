import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { JsonConvert } from 'json2typescript';


export class DBAdapter {

    constructor(public http:HTTP, public uri:string, public data:any, public header:any){

    }


    /////////////////////  When to Call   ////////////////////////////////////////////////////
    public getSymptomData() {
    
        return this.http.get(this.uri, this.data, this.header)
          .then(resp => {
            return resp.data;
          });

      }
/////////////////////////////////////////////////////////////////////////




    ////////////////////////////////  Goal   /////////////////////////////////
    public createNewGoal(userId:number, completion_date:string, goal:string) {
      var headers = {
        'Content-Type': 'application/json'
      }
  
      var data = {
        'user_id' : userId,
        'completion_date' : completion_date,
        'goal' : goal
      } 

      var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/SaveNewGoal";

      return this.http.post(uri, data, headers)
        .then(resp => {
          return resp.data;
        });
    }  


    public getGoalData(userId:number) {

      var headers = {
        'Content-Type': 'application/json'
      }
  
      var data = {
        'user_id' : userId
      } 

      var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetGoalInfo";

      return this.http.post(uri, data, headers)
        .then(resp => {
          return resp.data;
        });

    }

    public changeGoalToComplete(goalId:number) {

      var headers = {
        'Content-Type': 'application/json'
      }
  
      var data = {
        'goal_id' : goalId
      } 

      var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/ChangeGoalToComplete";

      return this.http.post(uri, data, headers)
        .then(resp => {
          return resp.data;
        });

    } 

    public changeGoalToIncomlete(goalId:number) {

      var headers = {
        'Content-Type': 'application/json'
      }
  
      var data = {
        'goal_id' : goalId
      } 

      var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/ChangeGoalToIncomplete";

      return this.http.post(uri, data, headers)
        .then(resp => {
          return resp.data;
        });

    }

/////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////   SSpedi   /////////////////////////////////////////
  public saveDailyRating() {
    return this.http.post(this.uri, this.data, this.header)
      .then(resp => {
        return resp.data;
      });
  }



  public getDailyRaiting(user_id:number) {

    var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetDailyRating";

    var headers = {
      'Content-Type': 'application/json'
    }
  
    var data = {
      'user_id' : user_id
    } 
  
  
  
    return this.http.post(uri, data, headers)
      .then(resp => {
        return resp.data;
      });

  }


  //////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////  Providers   //////////////////////////////


public getProviderData() {
 
  var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetProviderInfo";

  return this.http.post(uri, {}, {})
    .then(resp => {
      return resp.data;
    });

}


public getProviderContact(provider_id:number) {
 
  var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetProviderContact";

  var headers = {
    'Content-Type': 'application/json'
  }

  var data = {
    'provider_id' : provider_id
  } 



  return this.http.post(uri, data, headers)
    .then(resp => {
      return resp.data;
    });

}


////////////////////////////////////////////////////////////////////////////////




/////////////////////////////// Settings  ////////////////////////

public getBooldResult(user_id:number) {

  var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetBloodResult";

  var headers = {
    'Content-Type': 'application/json'
  }

  var data = {
    'user_id' : user_id
  } 



  return this.http.post(uri, data, headers)
    .then(resp => {
      return resp.data;
    });

}


public getWebsiteData() {

  var uri = "https://oncologyappservice.azurewebsites.net/WebService.asmx/GetWebsiteInfo";

  return this.http.post(uri, {}, {})
    .then(resp => {
      return resp.data;
    });

}

//////////////////////////////////////////////////////////////////





}