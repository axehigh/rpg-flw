import {Component, OnInit} from '@angular/core';

import {FamousLastWord, FirebaseService, MyCounter} from '../firebase.service';

import {RestApiService} from '../rest-api.service';
import {LoadingController} from '@ionic/angular';


@Component({
    selector: 'app-superadmin',
    templateUrl: './superadmin.page.html',
    styleUrls: ['./superadmin.page.scss'],
})
export class SuperadminPage implements OnInit {

    readonly DOCUMENT_MASTER_ID = "MASTER";

    documentMaster: FamousLastWord = {
        id: '99999',
        text: 'List of dying words',
        words: []
    };


    words: any;
    famousLastWords: any;

    private subscription;

    constructor(public api: RestApiService, private firebaseService: FirebaseService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        // this.getDataFromREST();
        this.getFirebaseContent();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async duplicateMaster() {
        try {
            if (this.words && this.documentMaster) {
                console.info("Prepare to write document");
                this.firebaseService.addDocument(this.documentMaster, this.DOCUMENT_MASTER_ID).then(function () {
                    console.info('Completed Adding Master');
                });
            } else {
                console.info("No words yet");
            }

        } catch (err) {

            console.log('Failed FirebasePage: ' + JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
        }
    }




    async getFirebaseContent() {
        let loading: any;
        try {
            loading = await this.loadingController.create({message: 'Loading all items'});
            await loading.present();

            this.subscription = this.firebaseService.getWordItems()
                .subscribe(res => {
                    this.documentMaster = res[1];
                    this.words = res[1].words;
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

    // async getFirebaseContent() {
    //     let loading: any;
    //     try {
    //         console.info('getFirebaseContent()');
    //         //if (!this.api.loaded) {
    //         loading = await this.loadingController.create({
    //             message: 'Opening tome'
    //         });
    //
    //         await loading.present();
    //         //}
    //         this.fireBaseService.getWordItems()
    //             .subscribe(res => {
    //                 this.words = res[0];
    //                 console.info('getFirebaseContent Success : Words is ' + this.words.length);
    //                 if (loading) {
    //                     loading.dismiss();
    //                 }
    //             });
    //     } catch (err) {
    //         if (loading) {
    //             loading.dismiss();
    //         }
    //         console.log('Failed FirebasePage: ' + JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
    //     }
    // }
    //
    // async getDataFromREST() {
    //     try {
    //
    //
    //         this.api.getDataOnce()
    //             .subscribe(res => {
    //                 this.words = res[0];
    //                 console.info('Completed loading (REST  DATA) : ' + this.words.length);
    //             }, err => {
    //                 console.log(err);
    //             });
    //     } catch (err) {
    //         console.log('Failed Firebase Page: ' + err);
    //     }
    // }
    //
    // updateSubmittedDocument() {
    //
    //     let word: FamousLastWord = {
    //         id: 'V1.0',
    //         text: 'Version one',
    //         words: []
    //     };
    //
    //     let i;
    //     for (i = 0; i < this.words.length; i++) {
    //         let currentWord = this.words[i];
    //         word.words.push(currentWord);
    //     }
    //
    //     // console.info(JSON.stringify(this.words));
    //     this.fireBaseService.addWord(word);
    //     console.info('Complete Batch Insert');
    // }
    //
    // batchInsert() {
    //
    //     var list = [];
    //
    //     var i;
    //     for (i = 0; i < this.words.length; i++) {
    //         let currentWord = this.words[i];
    //
    //         let word: FamousLastWord = {
    //             id: currentWord.textid,
    //             text: currentWord.text,
    //             words: []
    //         };
    //
    //         list.push(word);
    //
    //     }
    //
    //     this.fireBaseService.insertBatch(list);
    //     console.info("Complete Batch Insert");
    // }
    //
    // batchDelete() {
    //     var i;
    //     for (i = 0; i < this.famousLastWords.length; i++) {
    //         console.info('Word: ' + this.famousLastWords[i].id);
    //         this.fireBaseService.removeWord(this.famousLastWords[i].id);
    //     }
    //     console.info('Delete complete');
    //     this.getFirebaseContent();
    // }
    //
    // async batchCreate() {
    //
    //     let loading: any;
    //     if (!this.api.loaded) {
    //         loading = await this.loadingController.create({
    //             message: 'Loading'
    //         });
    //
    //         await loading.present();
    //     }
    //
    //     try {
    //         var i;
    //         for (i = 0; i < this.words.length; i++) {
    //
    //             // this.fireBaseService.removeWord(this.words[i].textid);
    //             let currentWord = this.words[i];
    //
    //             let word: FamousLastWord = {
    //                 id: currentWord.textid,
    //                 text: currentWord.text,
    //                 words: []
    //             };
    //
    //             this.fireBaseService.addWord(word);
    //             console.info('Added : ' + JSON.stringify(word));
    //
    //
    //         }
    //         if (loading) {
    //             loading.dismiss();
    //         }
    //     } catch (err) {
    //         console.error('error ' + err);
    //         if (loading) {
    //             loading.dismiss();
    //         }
    //
    //     }
    //
    // }
    //
    // remove(item) {
    //     this.fireBaseService.removeWord(item.id);
    // }

}
