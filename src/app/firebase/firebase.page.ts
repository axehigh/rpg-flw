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
    wordsResponse : any;
    private subscription;
    constructor(private fireBaseService: FirebaseService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        // this.subscription = this.fireBaseService.getWordItems()
        //     .subscribe(res => {
        //         // console.info('firebase.page.getcontent: ' + JSON.stringify(res))
        //         // this.words = res[0];
        //         this.words = res[0].words;
        //         this.wordsResponse = res;
        //         console.info('getFirebaseContent Success : Words is ' + this.words.length);
        //         // if (loading) {
        //         //     loading.dismiss();
        //         // }
        //     });
        this.getFirebaseContent();
    }

    ngOnDestroy() {
        console.info("Unsubscription");
        this.subscription.unsubscribe();
    }

    async getFirebaseContent() {
        let loading: any;
        try {
            console.info('getFirebaseContent()');
            loading = await this.loadingController.create({message: 'Opening tome 2'});
            await loading.present();

            this.subscription = this.fireBaseService.getWordItems()
                .subscribe(res => {
                   // console.info('firebase.page.getcontent: ' + JSON.stringify(res))
                    // this.words = res[0];
                    this.words = res[0].words;
                    this.wordsResponse = res;
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
