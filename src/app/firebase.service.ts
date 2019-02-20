import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';


export interface FamousLastWord {
    id?: string;
    text: string;
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private famousLastWordCollection: AngularFirestoreCollection<FamousLastWord>;
    private famousLastWords: Observable<FamousLastWord[]>;
    private db: AngularFirestore;

    constructor(db: AngularFirestore) {

        this.db = db;
        // Firestore
        this.famousLastWordCollection = db.collection<FamousLastWord>('rpg-flw');

        this.famousLastWords = this.famousLastWordCollection.snapshotChanges().pipe(
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
    getWords() {
        return this.famousLastWords;
    }

    getWord(id) {
        return this.famousLastWordCollection.doc<FamousLastWord>(id).valueChanges();
    }

    updateWord(flw: FamousLastWord, id: string) {
        return this.famousLastWordCollection.doc(id).update(flw);
    }

    addWord(flw: FamousLastWord) {
        return this.famousLastWordCollection.add(flw);
    }

    removeWord(id) {
        return this.famousLastWordCollection.doc(id).delete();
    }

    insertBatch(list: FamousLastWord[]) {
        //--create batch--
        var batch = this.db.firestore.batch();

        // let famousRef: []
        var i;
        var promises = [];

        var counter = 0;

        for (i = 0; i < list.length; i++) {

            //--create a reference--
            var famousRef = this.db.collection('rpg-flw').doc(list[i].id).ref;

            batch.set(famousRef, {
                id: list[i].id,
                text: list[i].text
            });

            counter++;
            if (counter % 400 === 0) {
                promises.push(batch.commit);
                console.info("Commit " + counter)

            }

        }

        //--finally--
        console.info("Commit " + counter)
        promises.push(batch.commit());

        Promise.all(promises).then(function (values) {
            console.log("all Commits have been resolved");
            return values;
        });

    }
}
