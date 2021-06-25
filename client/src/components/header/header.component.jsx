import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

// import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';  //sintassi speciale per importare SVG

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import './header.styles.scss';

//header component = functional component => ...
//nelle quadre del functional component viene dichiarata la variabile currentUser

const Header = ({ currentUser, hidden, signOutStart }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP 
            </Link>
            <Link className='option' to='/shop'>
                CONTATTI
            </Link>
            {/* <p>| CIAO, {currentUser.displayName} |</p> */}
            {
                currentUser ?   //mostra lo stato dell'user connesso
                (<div className='option' onClick={signOutStart}>DISCONNETTITI</div>)
                :
                (<Link className='option' to='/signin'>ACCEDI</Link>)
            }
            <CartIcon />
        </div>
        {
            hidden ? null :
            <CartDropdown />
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);