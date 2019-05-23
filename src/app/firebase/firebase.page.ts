import {Component, OnInit} from '@angular/core';

import {FamousLastWord, FirebaseService} from '../firebase.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-firebase',
    templateUrl: './firebase.page.html',
    styleUrls: ['./firebase.page.scss'],
})
export class FirebasePage implements OnInit {

    private subscription;
    readonly DOCUMENT_MASTER_ID = "MASTER";
    readonly DOCUMENT_ACCEPTED_ID = "ACCEPTED";
    currentDocument: FamousLastWord;
    currentWords: any;

    constructor(private firebaseService: FirebaseService, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.getDocumentAndWords(this.DOCUMENT_ACCEPTED_ID);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

     master(){
        this.getDocumentAndWords(this.DOCUMENT_MASTER_ID);
    }

     submitted(){
        this.getDocumentAndWords(this.DOCUMENT_ACCEPTED_ID);
    }

    async getDocumentAndWords(currentDocument) {
        let loading: any;
        try {
            loading = await this.loadingController.create({message: 'Opening tome'});
            await loading.present();

            this.subscription = this.firebaseService.getDocument(currentDocument).subscribe(res => {
                if (res) {
                    this.currentDocument = res;
                    this.currentWords = this.currentDocument.words;
                }
                loading.dismiss();
            });
        } catch (err) {
            if (loading) {
                loading.dismiss();
            }
            console.log('Failed FirebasePage: ' + JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
        }
    }


}
