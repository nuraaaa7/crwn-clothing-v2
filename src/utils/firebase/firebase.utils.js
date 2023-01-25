import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyDVKZzAKEUFzkd8easrf0mweSFrMi49U0o",
   authDomain: "crwn-clothing-db-3fafe.firebaseapp.com",
   projectId: "crwn-clothing-db-3fafe",
   storageBucket: "crwn-clothing-db-3fafe.appspot.com",
   messagingSenderId: "572779510933",
   appId: "1:572779510933:web:2370237e546b9286d36f9c"
 };
 
 // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
   if (!userAuth) return;

   const userDocRef = doc(db, 'users', userAuth.email);
   const usersnapshot = await getDoc(userDocRef);

   if (!usersnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
         });
      }

      catch(error){
         console.log('user already exists', error.message)
      }
   }

   return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
   
   if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
}