import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

export interface FamousLastWordItem {
    id?: string;
    text: string;
    words: string [];
}

export interface FamousLastWord {
    id?: string;
    text: string;
    words: FamousLastWordItem [];
}


@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private famousLastWordCollection: AngularFirestoreCollection<FamousLastWord>;
    private famousLastWordsSnapshot: Observable<FamousLastWord[]>;
    private db: AngularFirestore;

    flwSnapshotCollection: Observable<any[]>;

    constructor(db: AngularFirestore) {
        console.info('Constructor of Firebase Service');
        this.db = db;
        // Firestore
        this.famousLastWordCollection = db.collection<FamousLastWord>('rpg-flw-master');

        this.famousLastWordsSnapshot = this.famousLastWordCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
        );

    }

    // Firestore
    getWords(): Observable<any> {
        console.info("getWords from DB()");
        return this.famousLastWordsSnapshot;
    }

    getWordItems(): Observable<any> {
        try {
            console.log('FirebaseService.getWordItems()');
            if (!this.flwSnapshotCollection && !Array.isArray(this.flwSnapshotCollection)) {
                const response = this.getWords();
                this.flwSnapshotCollection = response;
            } else {
                console.log('Using Service variable');
            }
            return this.flwSnapshotCollection;

        } catch (e) {
            console.error("Error:" + JSON.stringify(e, ['message', 'arguments', 'type', 'name']));
        }

    }

    getWord(id) {
        return this.famousLastWordCollection.doc<FamousLastWord>(id).valueChanges();
    }

    getDocument(id) {
        return this.famousLastWordCollection.doc<FamousLastWord>(id).valueChanges();
    }

    updateWord(flw: FamousLastWord, id: string) {
        return this.famousLastWordCollection.doc(id).update(flw);
    }

    addWord(flw: FamousLastWord) {
        return this.famousLastWordCollection.add(flw);
    }

    addDocument(flw: FamousLastWord,title) {
        return this.famousLastWordCollection.doc(title).set(flw);
    }

    removeWord(id) {
        return this.famousLastWordCollection.doc(id).delete();
    }

    insertBatch(list: FamousLastWord[]) {
        try {


            //--create batch--
            var batch = this.db.firestore.batch();

            // let famousRef: []
            var i;
            var promises = [];

            var counter = 0;

            for (i = 0; i < list.length; i++) {

                // --create a reference--
                var famousRef = this.db.collection('rpg-flw').doc(list[i].id).ref;

                batch.set(famousRef, {
                    id: list[i].id,
                    text: list[i].text
                });

                counter++;
                if (counter % 400 === 0) {
                    promises.push(batch.commit);
                    console.info('Commit ' + counter);

                }

            }

            //--finally--
            console.info('Commit ' + counter);
            promises.push(batch.commit());

            Promise.all(promises).then(function (values) {
                console.log('all Commits have been resolved');
                return values;
            });
         }catch( err){
            console.error(JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
        }


    }
}
