import { Component, OnInit } from '@angular/core';
import {FamousLastWord, FamousLastWordItem, FirebaseService, MyCounter} from '../../firebase.service';
import {faTrashAlt, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {LoadingController, NavController, ToastController} from "@ionic/angular";
import {AuthenticateService} from '../../services/authentication.service';

@Component({
  selector: 'app-submitted',
  templateUrl: './submitted.page.html',
  styleUrls: ['./submitted.page.scss'],
})
export class SubmittedPage implements OnInit {

    //icons
    faTrashAlt = faTrashAlt;
    faCheckCircle = faCheckCircle;

    readonly admin = true;
    readonly SUBMITTED_DOCUMENT = 'submitted';
    readonly ACCEPTED_DOCUMENT = 'ACCEPTED';


    documentMaster: FamousLastWord = {
        id: '99999',
        text: 'List of dying words',
        words: []
    };

    private subscriptionSubmitted;
    private subscriptionAccepted;
    submittedDocument: FamousLastWord;
    acceptedDocument: FamousLastWord;
    words: any;
    acceptedWords: any;

    wordItem: FamousLastWordItem = {
        id: '10000',
        text: '',
        words: []
    };

    counterDocument: MyCounter;

    isAdmin: boolean = false;

    constructor(private firebaseService: FirebaseService,
                public loadingController: LoadingController,
                public toastController: ToastController,
                private authService: AuthenticateService,
                private navCtrl: NavController
                ) {
    }

    ngOnInit() {
        this.loadSubmittedDocument();
        this.loadAcceptedDocument();
        this.isAdmin = this.authService.isUserAdmin();
        console.info("isadmin:" + this.isAdmin);
    }

    ngOnDestroy() {
        this.subscriptionSubmitted.unsubscribe();
        this.subscriptionAccepted.unsubscribe();
    }

    async loadSubmittedDocument() {
        this.subscriptionSubmitted = this.firebaseService.getWord(this.SUBMITTED_DOCUMENT).subscribe(res => {
            // console.info("Load Document: " + JSON.stringify(res));
            if (res) {
                this.submittedDocument = res;
                this.words = this.submittedDocument.words;
                // console.info("Words: " + JSON.stringify(this.words));
            }
        });
    }

    async loadAcceptedDocument() {
        this.subscriptionAccepted = this.firebaseService.getWord(this.ACCEPTED_DOCUMENT).subscribe(res => {
            if (res) {
                this.acceptedDocument = res;
                this.acceptedWords = this.acceptedDocument.words;
            }
        });
    }

    async removeSubmittedItem(selectedItem) {
        this.removeItemFromDocument(selectedItem, this.submittedDocument, this.SUBMITTED_DOCUMENT);
    }

    async removeAcceptedItem(selectedItem) {
        this.removeItemFromDocument(selectedItem, this.acceptedDocument, this.ACCEPTED_DOCUMENT);
    }

    async removeItemFromDocument(selectedItem, document, documentId) {
        let index = document.words.findIndex(x => x.id == selectedItem.id);
        document.words.splice(index, 1);
        this.firebaseService.updateWord(document, documentId).then(() => {
            console.info("Updated " + documentId + " document");
        });
    }

    async updateSubmittedDocument() {
        let loading: any;
        if (this.submittedDocument) {
            try {
                // loading = await this.loadingController.create({message: 'Sending ...'});
                // await loading.present();
                console.info("Run check if the word exists from before 2");
                // get counter

                const result = this.counterFromSubmit().then(() => {
                    this.presentToast("Sending for approval");
                    if (this.counterDocument) {
                        console.info("Counter" + this.counterDocument.counter);
                        this.wordItem.id = "" + this.counterDocument.counter;

                        this.submittedDocument.words.push(this.wordItem);
                        const result2 = this.firebaseService.updateWord(this.submittedDocument, this.SUBMITTED_DOCUMENT).then(() => {
                            console.info("Added the word");
                            this.wordItem.text = '';
                            this.wordItem.id = "0";

                            // loading.dismiss();
                        });
                    }
                });
            } catch (err) {
                if (loading) {
                    loading.dismiss();
                }
                console.log('Failed FirebasePage: ' + JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
            }
        } else {
            // Should only be done once, or when all Submitted are gone.
            this.documentMaster.words.push(this.wordItem);
            // console.info(JSON.stringify(this.words));
            this.firebaseService.addDocument(this.documentMaster, this.SUBMITTED_DOCUMENT);
            console.info('Completed Adding Document');
        }


    }

    async presentToast(txt: string) {
        const toast = await this.toastController.create({
            message: txt,
            duration: 2000
        });
        toast.present();
    }

    async acceptSubmitted(acceptedWord: FamousLastWordItem) {

        if (this.acceptSubmitted && this.acceptedWords) {
            console.info("Run check if the word exists from before 1");
            this.acceptedDocument.words.push(acceptedWord);
            this.firebaseService.updateWord(this.acceptedDocument, this.ACCEPTED_DOCUMENT).then(() => {
                console.info("Added word to Accepted List");
                this.removeSubmittedItem(acceptedWord)
            });
        } else {
            // Should only be done once, or when all Submitted are gone.
            this.documentMaster.words.push(acceptedWord);
            // console.info(JSON.stringify(this.words));
            this.firebaseService.addDocument(this.documentMaster, this.ACCEPTED_DOCUMENT);
            console.info('Completed Adding Word to Accepted List');
        }


    }

    async counterFromSubmit() {
        const result = this.firebaseService.globalCounter().then(() => {
            this.counterDocument = this.firebaseService.counterDocument;
            const result2 = this.firebaseService.updateGlobalCounter();
        });
    }

    // async updateGlobalCounterFromSubmit() {
    //     this.firebaseService.updateGlobalCounter().then(() => {
    //         this.counterDocument = this.firebaseService.counterDocument;
    //     })
    // }


    superAdmin() {
        console.info("Superadmin");
        this.navCtrl.navigateForward('admin/superadmin');
    }
}
