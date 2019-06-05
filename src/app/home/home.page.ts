import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
// import {RestApiService} from '../rest-api.service';
import {FirebaseService} from '../firebase.service';
import {faBookDead, faChessRook} from '@fortawesome/free-solid-svg-icons';
import {AuthenticateService} from '../services/authentication.service';

// Social Sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    private subscription;
    public words: any;
    public word: 'Lets not forget, remember the PC Deaths.';

    // constructor(public api: RestApiService, public loadingController: LoadingController) {
    constructor(
        public loadingController: LoadingController,
        private fireBaseService: FirebaseService,
        private authService: AuthenticateService,
        private socialShare: SocialSharing) {
    }

    //icons
    faBookDead = faBookDead;
    faChessRook = faChessRook;

    ngOnInit() {
        this.getFirebaseContent();

        if (this.authService.isUserAdmin()) {
            console.info("Is Admin");
        } else {
            console.info("Is normal");
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getFirebaseContent() {
        let loading: any;
        try {
            loading = await this.loadingController.create({message: 'Opening tome'});
            await loading.present();

            this.subscription = this.fireBaseService.getWordItems()
                .subscribe(res => {
                    this.words = res[0].words;
                    this.getRandom();
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

    getRandom() {
        const randomize = Math.floor(Math.random() * this.words.length);
        this.word = this.words[randomize];
    }


    shareThis() {
        this.socialShare.canShareViaEmail().then(() => {
            console.info('Can share via email');
        }).catch(() => {
            // Sharing via email is not possible
            console.info('Cannot share via email');
        });
    }
}
