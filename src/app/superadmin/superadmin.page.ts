import {Component, OnInit} from '@angular/core';

import {FamousLastWord, FirebaseService} from '../firebase.service';

import {RestApiService} from '../rest-api.service';
import {LoadingController} from '@ionic/angular';


@Component({
    selector: 'app-superadmin',
    templateUrl: './superadmin.page.html',
    styleUrls: ['./superadmin.page.scss'],
})
export class SuperadminPage implements OnInit {

    words: any;
    famousLastWords : any;

    constructor(public api: RestApiService, private fireBaseService: FirebaseService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        // this.getDataFromREST();
        //this.getFirebaseContent();
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
    // createDocument() {
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
