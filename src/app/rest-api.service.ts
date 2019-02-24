import {Injectable} from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {forkJoin} from 'rxjs';


const listAll = 0;
const listSome = 1;

const listIndex = listAll;
const apiUrl = 'http://axehigh.com/rpg/flw2/index.php/listdato:'+listIndex+':01-01-2010';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    thisname: string;
    wordList: Observable<any>;
    public loaded: boolean;

    constructor(private http: HttpClient) {
        //this.thisname = 'Restapi#' + Math.floor(Math.random() * 100);
    }

    getDataOnce(): Observable<any> {
        try {
            console.log('getDataFromREST() ');
            if (!this.wordList && !Array.isArray(this.wordList)) {
                console.debug('REST API: ' + apiUrl);
                const response1 = this.http.get(apiUrl);
                this.wordList = forkJoin([response1]);
                this.loaded = true;
            }
            console.info('WordList: ' + JSON.stringify(this.wordList));
            return this.wordList;
        } catch (e) {
            console.error(JSON.stringify(e, ['message', 'arguments', 'type', 'name']));
        }
    }


}
