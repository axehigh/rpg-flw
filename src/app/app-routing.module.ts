import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home', loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'about', loadChildren: './about/about.module#AboutPageModule'
    },
    {
        path: 'words', loadChildren: './words/words.module#WordsPageModule'
    },
  { path: 'firebase', loadChildren: './firebase/firebase.module#FirebasePageModule' },  { path: 'superadmin', loadChildren: './superadmin/superadmin.module#SuperadminPageModule' },
  { path: 'submit', loadChildren: './submit/submit.module#SubmitPageModule' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
