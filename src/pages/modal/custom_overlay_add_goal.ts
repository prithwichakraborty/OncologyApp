import { Component } from '@angular/core';
import { NavController, NavParams, List, Item, ItemSliding } from 'ionic-angular';
import { ViewController, IonicPageModule, IonicPage } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AlertController } from 'ionic-angular';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { DBAdapter } from '../model/dbadapter';


@Component({
    selector: 'page-modal',
    templateUrl: 'custom_overlay_add_goal.html'
})


export class Custom_Overlay_Add_Goal {

    user_id: number = 0;
    dtGoal: string;
    txtNewGoal: string;
    


    dbadapter: DBAdapter;


    constructor(private http: HTTP, private alertCtrl: AlertController, private params: NavParams, public viewCtrl: ViewController) {

        this.user_id = parseInt(params.get('param_value'));

        if (this.user_id > 0) {

        }

    }

    public closeModal() {
        this.viewCtrl.dismiss();
    }

    private btnCreateGoalClicked() {

        if (this.user_id > 0 && this.dtGoal != "" && this.txtNewGoal != "") {


            this.dbadapter = new DBAdapter(this.http, "", {}, {});
            this.dbadapter.createNewGoal(this.user_id, this.dtGoal, this.txtNewGoal).then((respData: any) => {
                var temp = JSON.parse(respData); //"Success"
                
                if(temp == "Success") {
                    this.showDialog("Confirmation", "Goal created successfully");
                }
                else {
                    this.showDialog("Error", temp);
                }

            });
            
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

}