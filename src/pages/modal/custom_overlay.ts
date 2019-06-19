import { Component } from '@angular/core';
import { NavController, NavParams, List, Item, ItemSliding } from 'ionic-angular';
import { ViewController, IonicPageModule, IonicPage } from 'ionic-angular';


@Component({
    selector: 'page-modal',
    templateUrl: 'custom_overlay.html'
})


export class Custom_Overlay {



    details = [];

    constructor(params: NavParams, public viewCtrl: ViewController) {
        let detail_data: string;
        detail_data = params.get('param_value');
        
        if(detail_data != "") {
            let each_detail_data: string[] = detail_data.split('|');
            if (each_detail_data.length > 0) {
                
                each_detail_data.forEach(element => {
                    this.details.push(element);
                });
            }
        }
        

    }

    public closeModal() {
        this.viewCtrl.dismiss();
    }

}