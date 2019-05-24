import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SubmittedPage} from './submitted.page';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routes: Routes = [
    {
        path: '',
        component: SubmittedPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        FontAwesomeModule
    ],
    declarations: [SubmittedPage]
})
export class SubmittedPageModule {
}
