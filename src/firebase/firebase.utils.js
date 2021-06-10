import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//configurazione di firebase

const config = {
    apiKey: "AIzaSyAtvKVcqtgUjNSxSrp9yLOR4l_SC0irRPI",
    authDomain: "crown-db-a331a.firebaseapp.com",
    projectId: "crown-db-a331a",
    storageBucket: "crown-db-a331a.appspot.com",
    messagingSenderId: "43378748584",
    appId: "1:43378748584:web:82704f9a566c97632aa69d",
    measurementId: "G-DVQL4K9KCV"
  };

  //azione asincrona perchè stiamo facendo richiesta all'API

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
              displayName,
              email,
              createAt,
              ...additionalData
            })
        } catch (error) {
          console.log('errore creazione utente', error.message);
        }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //accesso a provider per autenticazione a Google

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); //attivare sempre il popup di Google Auth
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

  




