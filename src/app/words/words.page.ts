import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {RestApiService} from '../rest-api.service';

@Component({
    selector: 'app-words',
    templateUrl: './words.page.html',
    styleUrls: ['./words.page.scss'],
})
export class WordsPage implements OnInit {

    words: any;

    constructor(public api: RestApiService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.getDataOnce();
    }

    async getDataOnce() {
        try {
            // const loading = await this.loadingController.create({
            //     message: 'Loading'
            // });

            // await loading.present();

            this.api.getDataOnce()
                .subscribe(res => {
                    this.words = res[0];
                    // loading.dismiss();
                }, err => {
                    console.log(err);
                    // loading.dismiss();
                });
        } catch (err) {
            console.log("Failed Word Page: " + JSON.stringify(err, ["message", "arguments", "type", "name"]))
        }
    }

}
