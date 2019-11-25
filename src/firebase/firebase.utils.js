import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBTvLE16taEeQ7OLSJ7jzJO1rYpIsEbr6M",
  authDomain: "crwn-db4.firebaseapp.com",
  databaseURL: "https://crwn-db4.firebaseio.com",
  projectId: "crwn-db4",
  storageBucket: "crwn-db4.appspot.com",
  messagingSenderId: "1231452801",
  appId: "1:1231452801:web:979989fc0487a2fdb86b80",
  measurementId: "G-96RSPP17ZP"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    }
    catch(error){
      console.log('error creating users', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

