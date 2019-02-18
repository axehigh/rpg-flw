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
            let loading: any;
            //if (!this.api.loaded) {
                loading = await this.loadingController.create({
                    message: 'Opening tome'
                });

                await loading.present();
            //}

            this.api.getDataOnce()
                .subscribe(res => {
                    this.words = res[0];
                    if (loading) {
                        loading.dismiss();
                    }
                }, err => {
                    console.log(err);
                    if (loading) {
                        loading.dismiss();
                    }
                });
        } catch (err) {
            console.log("Failed Word Page: " + JSON.stringify(err, ["message", "arguments", "type", "name"]))
        }
    }

}
