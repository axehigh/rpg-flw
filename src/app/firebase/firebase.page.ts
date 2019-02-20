import {Component, OnInit} from '@angular/core';

import {FamousLastWord, FirebaseService} from '../firebase.service';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {RestApiService} from '../rest-api.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-firebase',
    templateUrl: './firebase.page.html',
    styleUrls: ['./firebase.page.scss'],
})
export class FirebasePage implements OnInit {

    public words: any;

    famousLastWords: FamousLastWord [];

    constructor(public api: RestApiService, private fireBaseService: FirebaseService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.getDataFromREST();
        this.getFirebaseContent();
    }

    getFirebaseContent() {
        this.fireBaseService.getWords().subscribe(res => {
            this.famousLastWords = res;
            console.info("Completed loading of Firebase: " + this.famousLastWords.length);
        });
    }


    async getDataFromREST() {
        try {


            this.api.getDataOnce()
                .subscribe(res => {
                    this.words = res[0];
                    console.info("Completed loading : " + this.words.length)
                }, err => {
                    console.log(err);
                });
        } catch (err) {
            console.log("Failed Firebase Page: " + err);
        }
    }

    batchInsert() {

        var list= [];

        var i;
        for (i = 0; i < this.words.length; i++) {

            let currentWord = this.words[i];

            let word: FamousLastWord = {
                id: currentWord.textid,
                text: currentWord.text
            };

            list.push(word);

        }

        this.fireBaseService.insertBatch(list);
        console.info("Complete Batch Insert");
    }

    batchDelete() {
        var i;
        for (i = 0; i < this.famousLastWords.length; i++) {
            console.info("Word: " + this.famousLastWords[i].id);
            this.fireBaseService.removeWord(this.famousLastWords[i].id);
        }
        console.info("Delete complete");
        this.getFirebaseContent();
    }

    async batchCreate() {

        let loading: any;
        if (!this.api.loaded) {
            loading = await this.loadingController.create({
                message: 'Loading'
            });

            await loading.present();
        }

        try {
            var i;
            for (i = 0; i < this.words.length; i++) {

                // this.fireBaseService.removeWord(this.words[i].textid);
                let currentWord = this.words[i];

                let word: FamousLastWord = {
                    id: currentWord.textid,
                    text: currentWord.text
                };

                this.fireBaseService.addWord(word);
                console.info("Added : " + JSON.stringify(word));


            }
            if (loading) {
                loading.dismiss();
            }
        } catch (err) {
            console.error("error " + err);
            if (loading) {
                loading.dismiss();
            }

        }

    }

    remove(item) {
        this.fireBaseService.removeWord(item.id);
    }

}
