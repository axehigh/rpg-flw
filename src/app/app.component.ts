import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {faBookDead, faChessRook, faQuestionCircle, faDungeon, faHeart,faScroll} from '@fortawesome/free-solid-svg-icons';


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
            icon: 'faDungeon'
        },
        // {
        //     title: 'Tome of last words',
        //     url: '/words',
        //     icon: 'faBookDead'
        // },
        {
            title: 'Tome of last words',
            url: '/firebase',
            icon: 'faBookDead'
        },
        {
            title: 'Submit a final word',
            url: '/submit',
            icon: 'faScroll'
        },
        {
            title: 'Let´s not forget',
            url: '/about',
            icon: 'faHeart'
        }
        ,
        {
            title: 'Superadmin',
            url: '/superadmin',
            icon: 'faHeart'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
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
}
