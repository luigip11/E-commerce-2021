import React, { useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'

const App = ({ checkUserSession, currentUser }) => {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  // unsubscribeFromAuth = null;

  //se l'utente si è loggato mostralo

  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // this.setState({ currentUser: user });

    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       // this.setState({
    //       //   currentUser: 
    //         setCurrentUser ({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         });
    //       });
    //   }
    //   setCurrentUser(userAuth); //se l'utente si disconnette lo saprà
      
    // });
    // }

  //chiudi la sottoscrizione dello script

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);  //se non impostiamo un secondo parametro, useEffect sarà eseguito in loop

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
       <Route exact path='/' component={HomePage} />   
       <Route path='/shop' component={ShopPage} />
       <Route exact path='/checkout' component={CheckoutPage} />  
       <Route exact path='/signin' 
         render= {() => currentUser ? 
          (<Redirect to='/' />) : 
          (<SignInAndSignUpPage />)
          } />    
      </Switch>
    </div>
  );
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
