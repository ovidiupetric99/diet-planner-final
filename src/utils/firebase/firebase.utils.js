import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore, //acces to data base
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const {REACT_APP_FIREBASE_SECRET_KEY} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_SECRET_KEY,
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

  // console.log (userAuth);
};

export const auth = getAuth ();
export const signInWithGooglePopup = () => {
  signInWithPopup (auth, googleProvider);
};
export const signInWithGoogleRedirect = () =>
  signInWithRedirect (auth, googleProvider);

export const db = getFirestore ();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  //if user data doesn't exist do this ->
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

export const editUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  if (userSnapshot.exists ()) {
    try {
      await updateDoc (userDocRef, {
        ...additionalInformation,
      });
    } catch (error) {
      console.log ('error editing the user', error.message);
    }
  }
};

export const getUserDocumentFromAuth = async userAuth => {
  if (!userAuth) return;

  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  if (userSnapshot.exists ()) return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword (auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword (auth, email, password);
};

export const signOutUser = async () => await signOut (auth);

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged (auth, callback);

export const currentUserData = async userAuth => {
  if (!userAuth) return;
  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  if (
    userSnapshot.data ().wheight &&
    userSnapshot.data ().height &&
    userSnapshot.data ().activity &&
    userSnapshot.data ().gender
  ) {
    return true;
  } else {
    return false;
  }
};

export const currentUserSnapshot = async userAuth => {
  if (!userAuth) return;
  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  return userSnapshot.data ();
};

export const userMealsNumber = async userAuth => {
  if (!userAuth) return;
  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);

  return userSnapshot.data ().mealsNumber;
};

export const userMacrosGoal = async userAuth => {
  if (!userAuth) return;
  let macros = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };
  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);
  macros = {
    kcal: userSnapshot.data ().kcal,
    protein: userSnapshot.data ().protein,
    carbs: userSnapshot.data ().carbs,
    fat: userSnapshot.data ().fats,
  };

  return macros;
};

export const userTotalMacrosFromDiet = async userAuth => {
  if (!userAuth) return;
  const userDocRef = doc (db, `users/${userAuth.uid}/diet/diet`);
  //get user Doc referene

  const userSnapshot = await getDoc (userDocRef);
  const items = userSnapshot.data ();
  let total = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  //parcurgere alimente din dieta
  //la total se aduna cantiatea alimentului * valoarea macronutrientului
  for (let i in items) {
    const item = items[i];
    total = {
      kcal: total.kcal + item.kcal * item.quantity,
      protein: total.protein + item.protein * item.quantity,
      carbs: total.carbs + item.carbs * item.quantity,
      fat: total.fat + item.fat * item.quantity,
    };
  }

  return total;
  // returneaza obiectul total
};

export const clearUserDiet = async userAuth => {
  if (!userAuth) return;

  const listRef = doc (db, `users/${userAuth.uid}/diet/diet`);

  await deleteDoc (listRef);

  await setDoc (doc (db, `users/${userAuth.uid}/diet/diet`), {});
};

export const userMetrics = async userAuth => {
  if (!userAuth) return;
  let metrics = {
    wheight: 0,
    height: 0,
  };
  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc (userDocRef);
  metrics = {
    wheight: userSnapshot.data ().wheight,
    height: userSnapshot.data ().height,
  };

  return metrics;
};
