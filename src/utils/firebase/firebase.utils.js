import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWIthGooglePopup = () => signInWithPopup(auth, provider);