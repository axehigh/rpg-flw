import {Component, OnInit} from '@angular/core';
import {FamousLastWord, FamousLastWordItem, FirebaseService} from '../firebase.service';

import {faTrashAlt, faCheckCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-submit',
    templateUrl: './submit.page.html',
    styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

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

    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.loadSubmittedDocument();
        this.loadAcceptedDocument();

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

        async removeSubmittedItem2(selectedItem) {
        console.info("Deleted Item:  " + JSON.stringify(selectedItem));
        console.info("BEFORE"+JSON.stringify(this.words))
        let index = this.submittedDocument.words.findIndex(x => x.id == selectedItem.id);
        console.info("Found item at index of" + index);

        //delete this.words[index];
        this.submittedDocument.words.splice(index, 1);
        console.info("After"+JSON.stringify(this.words))
        this.firebaseService.updateWord(this.submittedDocument, this.SUBMITTED_DOCUMENT).then(() => {
            console.info("Updated Submitted Document");

        });
    }
    async removeSubmittedItem(selectedItem) {
        this.removeItemFromDocument(selectedItem, this.submittedDocument, this.SUBMITTED_DOCUMENT);
    }

    async removeAcceptedItem(selectedItem) {
        this.removeItemFromDocument(selectedItem, this.acceptedDocument, this.ACCEPTED_DOCUMENT);
    }

    async removeItemFromDocument(selectedItem, document,documentId) {
        let index = document.words.findIndex(x => x.id == selectedItem.id);
        document.words.splice(index, 1);
        this.firebaseService.updateWord(document, documentId).then(() => {
            console.info("Updated "+documentId+ " document");
        });
    }

    async updateSubmittedDocument() {

        if (this.submittedDocument) {
            console.info("Run check if the word exists from before");
            this.submittedDocument.words.push(this.wordItem);
            this.firebaseService.updateWord(this.submittedDocument, this.SUBMITTED_DOCUMENT).then(() => {
                console.info("Added the word");
            });
        } else {
            // Should only be done once, or when all Submitted are gone.
            this.documentMaster.words.push(this.wordItem);
            // console.info(JSON.stringify(this.words));
            this.firebaseService.addDocument(this.documentMaster, this.SUBMITTED_DOCUMENT);
            console.info('Completed Adding Document');
        }


    }

    async acceptSubmitted(acceptedWord: FamousLastWordItem) {

        if (this.acceptSubmitted && this.acceptedWords) {
            console.info("Run check if the word exists from before");
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
}
