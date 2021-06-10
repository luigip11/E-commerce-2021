import React from 'react';

import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//const HatsPage = () => (
//  <div>
//   <h1>HATS PAGE</h1> 
//  </div>
//  );

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  //se l'utente si è loggato mostralo

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log(this.state);
          });
        });
      }
      this.setState({ currentUser: userAuth }); //se l'utente si disconnette lo saprà
    });
  }

  //chiudi la sottoscrizione dello script

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
  return (
    <div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
       <Route exact path='/' component={HomePage} />   
       <Route path='/shop' component={ShopPage} />
       <Route path='/signin' component={SignInAndSignUpPage} />    
      </Switch>
    </div>
  );
  }
}

export default App;
