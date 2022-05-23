import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore, //acces to data base
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD8awU9YPDM_BPjowDYM4VOjRZ4SlzqAr0',
  authDomain: 'diet-planner-db.firebaseapp.com',
  projectId: 'diet-planner-db',
  storageBucket: 'diet-planner-db.appspot.com',
  messagingSenderId: '622087951583',
  appId: '1:622087951583:web:a89cfdcf8428c79d97456a',
};

const firebaseApp = initializeApp (firebaseConfig);

const googleProvider = new GoogleAuthProvider ();

googleProvider.setCustomParameters ({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log (userAuth);
};

export const auth = getAuth ();
export const signInWithGooglePopup = () =>
  signInWithPopup (auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect (auth, googleProvider);

export const db = getFirestore ();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  //if user data doesn t exist do this ->
  if (!userSnapshot.exists ()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date ();
    const premium = false;

    try {
      await setDoc (userDocRef, {
        displayName,
        email,
        createdAt,
        premium,
        ...additionalInformation,
      });
    } catch (error) {
      console.log ('error creating the user', error.message);
    }
  }

  //if user data exists ->
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword (auth, email, password);
};
