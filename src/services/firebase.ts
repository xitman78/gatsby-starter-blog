import * as firebase from "firebase/app"
import "firebase/firestore"
require('firebase/auth') // this should be imported like that

const config = {
  apiKey: "AIzaSyCrTcvY0CWsK1ZzrvnVGDBmf5891SXOi4A",
  authDomain: "netlify-blog.firebaseapp.com",
  databaseURL: "https://netlify-blog.firebaseio.com",
  projectId: "netlify-blog",
  storageBucket: "netlify-blog.appspot.com",
  messagingSenderId: "192080647144"
}

class Firebase {
  //@ts-ignore
  store: typeof firebase.firestore;
  //@ts-ignore
  auth: typeof firebase.auth;

  isSigned: boolean | undefined = undefined;

  constructor() { }

  init() {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
    this.auth = firebase.auth;
  }

  get comments() {
    return this.store().collection('comments');
  }

  get uiConfig() {
    return {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        //firebaseService.auth.GoogleAuthProvider.PROVIDER_ID,
        this.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }
    };
  }

  signOut() {
    this.auth().signOut();
  }

  createComment(postId: string, text: string) {
    return this.comments.add({
      postId: postId.replace(/\//g, ''),
      text,
      createdAt: this.store.Timestamp.fromDate(new Date()),
      author: {
        displayName: this.auth().currentUser!.displayName,
        photoUrl: this.auth().currentUser!.photoURL || '',
      }
    });
  }
}

export default new Firebase();