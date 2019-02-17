import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {faBookDead, faChessRook, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';


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

    public appPages = [
        {
            title: 'Main Gate',
            url: '/home',
            icon: 'faChessRook'
        },
        {
            title: 'Book of Famous Last Words',
            url: '/words',
            icon: 'faBookDead'
        },
        {
            title: 'About',
            url: '/about',
            icon: 'faQuestionCircle'
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
