import * as firebase from "firebase/app"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyCrTcvY0CWsK1ZzrvnVGDBmf5891SXOi4A",
  authDomain: "netlify-blog.firebaseapp.com",
  databaseURL: "https://netlify-blog.firebaseio.com",
  projectId: "netlify-blog",
  storageBucket: "netlify-blog.appspot.com",
  messagingSenderId: "192080647144"
}

class Firebase {
  store: any;
  auth: any;

  init() {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
    this.auth = firebase.auth;
  }

  get comments() {
    return this.store().collection('comments');
  }
}

export default new Firebase();