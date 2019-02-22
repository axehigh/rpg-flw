import {Component, OnInit} from '@angular/core';

import {FirebaseService} from '../firebase.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-firebase',
    templateUrl: './firebase.page.html',
    styleUrls: ['./firebase.page.scss'],
})
export class FirebasePage implements OnInit {

    words: any;
    constructor(private fireBaseService: FirebaseService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.getFirebaseContent();
    }

    async getFirebaseContent() {
        try {
            console.info('getFirebaseContent()');
            let loading: any;
            //if (!this.api.loaded) {
            loading = await this.loadingController.create({
                message: 'Opening tome'
            });

            await loading.present();
            //}
            this.fireBaseService.getWordItems()
                .subscribe(res => {
                this.words = res[0];
                console.info('getFirebaseContent Success : Words is ' + this.words.length);
                    if (loading) {
                        loading.dismiss();
                    }
            });
        } catch (err) {
            if (loading) {
                loading.dismiss();
            }
            console.log('Failed FirebasePage: ' + JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
        }
    }


}
