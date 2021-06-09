import React from 'react';

import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';  //sintassi speciale per importare SVG

import './header.styles.scss';

//header component = functional component => ...
//nelle quadre del functional component viene dichiarata la variabile currentUser

const Header = ({ currentUser }) => (
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
            {
                currentUser ?   //mostra lo stato dell'user connesso
                <div className='option' onClick={() => auth.signOut()}>DISCONNETTITI</div>
                :
                <Link className='option' to='/signin'>ACCEDI</Link>
            }
        </div>
    </div>
)

export default Header;