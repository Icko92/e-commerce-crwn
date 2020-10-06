import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBtEE6-_Z9KZWWX5gT6YF64yvUatpU6BCg",
  authDomain: "crwn-db-69a19.firebaseapp.com",
  databaseURL: "https://crwn-db-69a19.firebaseio.com",
  projectId: "crwn-db-69a19",
  storageBucket: "crwn-db-69a19.appspot.com",
  messagingSenderId: "631808015145",
  appId: "1:631808015145:web:f64583f241124b30285538",
  measurementId: "G-F5E0YDT0WN",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
