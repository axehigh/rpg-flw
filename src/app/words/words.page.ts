import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {RestApiService} from '../rest-api.service';

@Component({
    selector: 'app-words',
    templateUrl: './words.page.html',
    styleUrls: ['./words.page.scss'],
})
export class WordsPage implements OnInit {

    data1: any;
    // data2: any;
    // data3: any;
    // data4: any;

    constructor(public api: RestApiService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.getData();
    }

    async getData() {
        const loading = await this.loadingController.create({
            message: 'Loading'
        });
        await loading.present();
        this.api.getData()
            .subscribe(res => {
                console.log('Result:' + res[0]);
                this.data1 = res[0];
                // this.data2 = res[1];
                // this.data3 = res[2];
                // this.data4 = res[3];
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }

}
