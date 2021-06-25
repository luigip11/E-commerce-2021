import ShopActionTypes from "./shop.types";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,  //chiamata per recupero corretto delle raccolte
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,                        //payload=carico utile
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
      const collectionRef = firestore.collection('collections');
      dispatch(fetchCollectionsStart());           //richiama la chiamata di fetch dei dati
      
      collectionRef.get().then                     //richiesta asincrona       
        (snapshot=> {
         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
         dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};