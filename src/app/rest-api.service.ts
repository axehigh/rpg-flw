import {Injectable} from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {forkJoin} from 'rxjs';

const apiUrl = 'http://axehigh.com/rpg/flw2/index.php/listdato:1:01-01-2010';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    wordList: Observable<any>;

    constructor(private http: HttpClient) {
    }

    getDataOnce(): Observable<any> {
        try {
            console.log('getDataOnce() ');
            if (!this.wordList) {
                console.debug('REST API: ' + apiUrl);
                const response1 = this.http.get(apiUrl);
                this.wordList = forkJoin([response1]);
            }
            return this.wordList;
        } catch (e) {
            console.log(e);
        }
    }


}
