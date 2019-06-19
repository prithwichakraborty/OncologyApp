import { Component } from '@angular/core';
import { NavController, NavParams, List, Item, ItemSliding } from 'ionic-angular';
import { App, ViewController, IonicPageModule, IonicPage } from 'ionic-angular';
import { AnonymousSubject } from 'rxjs/Subject';
import { DBAdapter } from '../model/dbadapter';
import { JsonConvert, OperationMode, ValueCheckingMode, JsonObject } from "json2typescript";
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
import { TblContact } from '../model/data/tblcontact';
import { Custom_Overlay_Contact_Det } from '../modal/custom_overlay_contact_det';
import { ViewChild } from '@angular/core';
import { ProvidersPage } from '../providers/proviers';




@Component({
    selector: 'page-modal',
    templateUrl: 'custom_overlay_prov_det.html'
})


export class Custom_Overlay_Prov_Det {

    id: number = 0;
    name: string = "";
    address: string = "";
    website: string = "";
    latitude: number = 0;
    longitude: number = 0;
    distance: number = 0;

    provName: string;
    provDist: string;
    provAddr: string;


    allContactData: any = [];
    listEmrgContact: any = [];
    listNonEmrgContact: any = [];

    dbadapter: DBAdapter;


    hideProviderList:boolean = false;
    hideContactDetail:boolean = true;


    //contact details
    contact_id:number = 0;
    contact_name: string = "";
    contact_type: string = "";
    contact_phone: string = "";
    contact_email: string = "";
    contact_location:string = "";
    contact_appointment:string = "";
    contact_note:string = "";




    constructor(private appCtrl: App, private alertCtrl: AlertController, params: NavParams, public viewCtrl: ViewController, private http: HTTP, private navCtrl: NavController) {
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
                    else if (temp[0] == "addr") {
                        this.address = temp[1];
                    }
                    else if (temp[0] == "web") {
                        this.website = temp[1];
                    }
                    else if (temp[0] == "lat") {
                        this.latitude = parseInt(temp[1]);
                    }
                    else if (temp[0] == "long") {
                        this.longitude = parseInt(temp[1]);
                    }

                    //caculate distance from lat and long here
                    //......................






                });
            }
        }

        this.provName = this.name;
        this.provDist = "2.0 km";
        this.provAddr = this.address;

        this.loadContactData(this.id);



        this.hideProviderList = false;
        this.hideContactDetail = true;



    }



    // general methods

    public navigateToDetail(param_data: string) {

        try {

            this.navCtrl.push(Custom_Overlay_Contact_Det, { param_value: param_data });
        
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


    private loadContactData(provider_id: number) {




        this.dbadapter = new DBAdapter(this.http, "", {}, {});
        this.dbadapter.getProviderContact(provider_id).then((respData: any) => {




            let jsonConvert: JsonConvert = new JsonConvert();
            let rawData: TblContact[];
            this.allContactData = [];

            this.listEmrgContact = [];
            this.listNonEmrgContact = [];


            try {

                let jsonObj: Object = JSON.parse(respData);
                rawData = jsonConvert.deserialize(jsonObj, TblContact);



                rawData.forEach(element => {

                    let items = new ContactItems();
                    items.Id = element.Id;
                    items.Name = element.Name;
                    items.Location = element.Location;
                    items.Type = element.Type;
                    items.Appointment = ""; //element.Appointment;
                    items.Email = element.Email;
                    items.Note = element.Note;
                    items.Phone = element.Phone;



                    //Global variable
                    this.allContactData.push(items);

                    if (element.Type == "Emergency") {
                        this.listEmrgContact.push(items);
                    }
                    else if (element.Type == "Non-emergency") {
                        this.listNonEmrgContact.push(items);
                    }

                });

            }
            catch (e) {
                this.showDialog("Error", e._message);
            }

        });
    }



    //events
    private contactItemSelected(contactId: number) {


        let param_value: string = "";

        this.allContactData.forEach(element => {
          if (contactId == element.Id) {
            param_value = "id="+ element.Id.toString() + "|name=" + element.Name.toString() + "|location=" + 
            element.Location.toString() + "|phone=" + element.Phone.toString() + "|email=" +
              element.Email.toString() + "|appointment=" + element.Appointment.toString() +
              "|note="+element.Note + "|type="+element.Type + "|prov_name="+ this.provName + "|prov_addr"+
              this.provAddr + "|prov_dist=" + this.provDist;

              //contact
              this.contact_id = element.Id;
              this.contact_name = element.Name;
              this.contact_location = element.Location;
              this.contact_phone = element.Phone;
              this.contact_email = element.Email;
              this.contact_note = element.Note;
              this.contact_appointment = element.Appointment;     


          }
        });


        this.hideProviderList = true;
        this.hideContactDetail = false;


        //note: Ionic might not support multilevel page navigation, so put 2 screens into 1 page
        //this.navigateToDetail(param_value);

    }

    private closeModal() {
        this.viewCtrl.dismiss();
    }

}





//secondary data classes
class ContactItems {

    private _Id: number;
    get Id(): number { return this._Id; }
    set Id(value: number) { this._Id = value; }

    private _ProviderId: number;
    get ProviderId(): number { return this._ProviderId; }
    set ProviderId(value: number) { this._ProviderId = value; }

    private _Name: string;
    get Name(): string { return this._Name; }
    set Name(value: string) { this._Name = value; }

    private _Phone: string;
    get Phone(): string { return this._Phone; }
    set Phone(value: string) { this._Phone = value; }

    private _Email: string;
    get Email(): string { return this._Email; }
    set Email(value: string) { this._Email = value; }

    private _Location: string;
    get Location(): string { return this._Location; }
    set Location(value: string) { this._Location = value; }

    private _Note: string;
    get Note(): string { return this._Note; }
    set Note(value: string) { this._Note = value; }

    private _Type: string;
    get Type(): string { return this._Type; }
    set Type(value: string) { this._Type = value; }

    private _Appointment: string;
    get Appointment(): string { return this._Appointment; }
    set Appointment(value: string) { this._Appointment = value; }
}