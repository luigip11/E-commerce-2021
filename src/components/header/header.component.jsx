import React from 'react';

// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';  //sintassi speciale per importare SVG

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles'

// import './header.styles.scss';

//header component = functional component => ...
//nelle quadre del functional component viene dichiarata la variabile currentUser

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP 
            </OptionLink>
            <OptionLink to='/shop'>
                CONTATTI
            </OptionLink>
            {/* <p>| CIAO, {currentUser.displayName} |</p> */}
            {
                currentUser ?   //mostra lo stato dell'user connesso
                (<OptionDiv onClick={() => auth.signOut()}>DISCONNETTITI</OptionDiv>)
                :
                (<OptionLink to='/signin'>ACCEDI</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null :
            <CartDropdown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);