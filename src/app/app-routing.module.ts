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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
