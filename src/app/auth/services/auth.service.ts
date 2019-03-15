import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// import library for javascript popup boxes, responsive, customizable, etc
import Swal from 'sweetalert2';

// Import firebase library
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

// User model
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) { }

  /**
   * Method to create an user and save in Firebase
   * @param name
   * @param email
   * @param password
   */
  public createUser(name: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);

      const user: User = {
        uid: resp.user.uid,
        name: name,
        email: resp.user.email
      };

      // save in angular firestore data base
      this.afDB.doc(`${ user.uid }/user`)
        .set( user )
        .then(() => {
          this.router.navigate(['/']);
        });
    })
    .catch(error => {
      console.error(error);
      Swal('Error in login', error.message, 'error');
    });
  }

  /**
   * Method to login an user
   * @param email
   * @param password
   */
  public login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error(error);
      Swal('Error in login', error.message, 'error');
    });
  }

  /**
   * Method to logout of the application
   */
  public logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  /**
   * Method to listen the state of the user in the app
   */
  public initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log('User logged: ', fbUser);
    });
  }

  /**
   * Method to return true, If user is not null, false If user is null
   */
  public isAuth() {
    return this.afAuth.authState
      .pipe(
        map( (fbUser) => {
          if ( fbUser === null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }



}
