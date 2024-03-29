import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCJnuFCfCdYFRxxhXGeWAkjtd8ZDBPHRQ",
  authDomain: "mycrwnclothing.firebaseapp.com",
  projectId: "mycrwnclothing",
  storageBucket: "mycrwnclothing.appspot.com",
  messagingSenderId: "717906182370",
  appId: "1:717906182370:web:20def32ae952144d97debb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWIthGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWIthGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();

  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q)
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
};

export const getUserSnapshot = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  return userAuth;
};

export const signInWithEmailAndPasswordFireBase = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callBack) => {
  onAuthStateChanged(auth, callBack);
};
