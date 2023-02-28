import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


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



export const db =getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(error){
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if(!email || !password || !displayName) return;

   const userAuth = await createUserWithEmailAndPassword(auth, email, password);
   const userAuth2 = await updateProfile(userAuth.user,displayName)

    console.log(userAuth2)
   return userAuth2

}
