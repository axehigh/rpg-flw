import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {RestApiService} from '../rest-api.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public words: any;
    public word: 'Lets not forget, remember the PC Deaths.';

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
                console.log('async getData');
                this.words = res[0];
                this.getRandom();
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }

    getRandom() {
        const randomize = Math.floor(Math.random() * this.words.length);
        this.word = this.words[randomize];
        console.log(JSON.stringify(this.word));
        console.log('button click: ' + randomize + ' , ' + this.word);
    }


}
