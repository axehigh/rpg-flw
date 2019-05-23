import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService {

    constructor() {
    }

    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err))
        })
    }

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err))
        })
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(() => {
                        console.log("LOG Out");
                        resolve();
                    }).catch((error) => {
                    reject();
                });
            }
        })
    }

    userDetails() {
        return firebase.auth().currentUser;
    }

    isUserAdmin() {
        let user = this.userDetails();

        if (user) {
            console.info(JSON.stringify(user));
            return user.uid == 'iBwZVXBmDmcQknKuRoKkt1A1GBi2';
        }
        return false;
    }

}