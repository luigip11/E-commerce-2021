import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

// metodi per ottenere i documenti e le raccolte del nostro database

// firestore.collection('users').doc('DtPYUhuA0eIxv42IBwHL').collection('cartItems').doc('vbFNPkvlavOZiDTGl3vy')

firestore.doc('/users/DtPYUhuA0eIxv42IBwHL/cartItems/vbFNPkvlavOZiDTGl3vy');

firestore.collection('/users/DtPYUhuA0eIxv42IBwHL/cartItems');
