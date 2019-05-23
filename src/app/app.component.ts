import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {
    faBookDead,
    faChessRook,
    faQuestionCircle,
    faDungeon,
    faHeart,
    faScroll
} from '@fortawesome/free-solid-svg-icons';

import {AuthenticateService} from './services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']

})
export class AppComponent {

    //Icons
    faBookDead = faBookDead;
    faChessRook = faChessRook;
    faQuestionCircle = faQuestionCircle;
    faDungeon = faDungeon;
    faHeart = faHeart;
    faScroll = faScroll;

    public appPages = [
        {
            title: 'Famous last word',
            url: '/home',
            icon: 'faDungeon',
            access: 'all'
        },
        {
            title: 'Tome of last words',
            url: '/firebase',
            icon: 'faBookDead',
            access: 'all'
        },
        {
            title: 'Submit a final word',
            url: '/submit',
            icon: 'faScroll',
            access: 'all'
        },
        {
            title: 'Let´s not forget',
            url: '/about',
            icon: 'faHeart',
            access: 'all'

        }
        ,
        {
            title: 'Login',
            url: '/login',
            icon: 'faHeart',
            access: 'all'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });

    }

    ngOnInit() {
        console.info("ngOnInit");
    }


}
