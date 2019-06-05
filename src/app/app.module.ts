import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
// Social Sharing
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';

// Trying for unique identifier and admin management
import { Device } from '@ionic-native/device/ngx';
import { IsDebug } from '@ionic-native/is-debug/ngx';


// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookDead,faChessRook,faQuestionCircle ,faScroll, faLock} from '@fortawesome/free-solid-svg-icons';

//Firestore
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';


// Firestore Authentication
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthenticateService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

import * as firebase from 'firebase';


library.add(faBookDead, faChessRook, faQuestionCircle, faScroll,faLock);

firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        // Http Requests
        HttpClientModule,
        // Font Awesome
        FontAwesomeModule,

        //FireStore
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        //Firestore Authentication
        AngularFireAuthModule
    ],
    providers: [
        StatusBar,
        Device,
        IsDebug,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AuthenticateService,
        // Social Sharing
        SocialSharing

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
