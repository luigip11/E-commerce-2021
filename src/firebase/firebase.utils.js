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

  firebase.initializeApp(config);

  //azione asincrona perchè stiamo facendo richiesta all'API

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();

    // const collectionSnapshot = await collectionRef.get(); 
    // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

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
  
  //definizione chiave di raccolta

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {  //richiesta asincrona
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);

    const batch = firestore.batch();  //batch oggetto aggiunge userRef.set e li spara alla fine delle chiamate
    objectsToAdd.forEach(obj => {     //loop sull'oggetto objectToAdd usando il metodo forEach
      const newDocRef = collectionRef.doc();  //otteniamo il doc su una stringa vuota
      batch.set(newDocRef, obj);      //passa il riferimento del doc e il valore che vogliamo impostare
    });
    //otteniamo la registrazione di 5 ogg di riferimento del doc e ognuno ha il suo ID
    return await batch.commit();
  };

  //convertire la collezione in oggetto invece di un array
  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
    //funzione di riduzione per oggetto finale con 2° param oggetto vuoto
    return transformedCollection.reduce((accumulator, collection) => {   //oggetto va nella 1° nuova collezione
      accumulator[collection.title.toLowerCase()] = collection;   //imposta il primo val uguale al titolo in minus
      return accumulator;
    } , {});   //passiamo oggetto iniziale
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //accesso a provider per autenticazione a Google

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' }); //attivare sempre il popup di Google Auth
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;






