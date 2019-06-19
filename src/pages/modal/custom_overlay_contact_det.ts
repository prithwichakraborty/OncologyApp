import { Component } from '@angular/core';
import { NavController, NavParams, List, Item, ItemSliding } from 'ionic-angular';
import { ViewController, IonicPageModule, IonicPage } from 'ionic-angular';
import { AnonymousSubject } from 'rxjs/Subject';
import { DBAdapter } from '../model/dbadapter';
import { JsonConvert, OperationMode, ValueCheckingMode, JsonObject } from "json2typescript";
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
import { TblContact } from '../model/data/tblcontact';




@Component({
    selector: 'page-modal',
    templateUrl: 'custom_overlay_contact_det.html'
})


export class Custom_Overlay_Contact_Det {

    id: number = 0;
    name: string = "";
    type: string = "";
    phone: string = "";
    email: string = "";
    location:string = "";
    appointment:string = "";
    note:string = "";

    provName: string = "";
    provDist: string = "";
    provAddr: string = "";

    backColor:string = "";


    



    constructor(private alertCtrl: AlertController, params: NavParams, public viewCtrl: ViewController, private http: HTTP, private navCtrl: NavController) {
        
        


        let detail_data: string;
        detail_data = params.get('param_value');

        if (detail_data != "") {
            let each_detail_data: string[] = detail_data.split('|');
            if (each_detail_data.length > 0) {

                each_detail_data.forEach(element => {
                    let temp: string[] = element.split('=');
                    if (temp[0] == "id") {
                        this.id = parseInt(temp[1]);
                    }
                    else if (temp[0] == "name") {
                        this.name = temp[1];
                    }
                    else if (temp[0] == "location") {
                        this.location = temp[1];
                    }
                    else if (temp[0] == "phone") {
                        this.phone = temp[1];
                    }
                    else if (temp[0] == "email") {
                        this.email = temp[1];
                    }
                    else if (temp[0] == "appointment") {
                        this.appointment = temp[1];
                    }
                    else if (temp[0] == "note") {
                        this.note = temp[1];
                    }
                    else if (temp[0] == "type") {
                        this.type = temp[1];
                    }
                    else if (temp[0] == "prov_name") {
                        this.provName = temp[1];
                    }
                    else if (temp[0] == "prov_addr") {
                        this.provAddr = temp[1];
                    }
                    else if (temp[0] == "prov_dist") {
                        this.provDist = temp[1];
                    }


                    if(this.type == "Emergency") {
                        this.backColor = "red"
                    }
                    else if (this.type == "Non-emergency") {
                        this.backColor = "blue";
                    }


                    
                });
            }
        }



    }



    // general methods

    private showDialog(_title: string, _message: string) {
        let alert = this.alertCtrl.create({
            title: _title,
            subTitle: _message,
            buttons: ['OK']
        });
        alert.present();
    }




    //events

    private closeModal() {
        this.viewCtrl.dismiss();
    }

}


