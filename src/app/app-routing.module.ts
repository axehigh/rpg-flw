import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'home',
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
    {
        path: 'words', loadChildren: './words/words.module#WordsPageModule'
    },
    {path: 'firebase', loadChildren: './firebase/firebase.module#FirebasePageModule'},
    {path: 'superadmin', loadChildren: './superadmin/superadmin.module#SuperadminPageModule'},
    {path: 'submit', loadChildren: './submit/submit.module#SubmitPageModule'},
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    //{path: '', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
