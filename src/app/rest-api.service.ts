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

    getData(): Observable<any> {
        try {
            const response1 = this.http.get(apiUrl);
            console.log('Call restapi.GetData()');
            // let response2= this.http.get(apiUrl+'IN/110001');
            // let response3 = this.http.get(apiUrl+'BR/01000-000');
            // let response4 = this.http.get(apiUrl+'FR/01000');
            return forkJoin([response1/*,response2, response3, response4*/]);
        } catch (e) {
            console.log(e);
        }
    }

    getDataOnce(): Observable<any> {
        try {
            const response1 = this.http.get(apiUrl);
            this.wordList = forkJoin([response1]);

            console.log('getDataOnce() ');
            if (!this.wordList) {
                console.debug('REST API: ' + apiUrl);
            }
            return this.wordList;
        } catch (e) {
            console.log(e);
        }
    }


}
