import React from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';  //sintassi speciale per importare SVG

import './header.styles.scss';

//header component = functional component => ...

const Header = () => (
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
        </div>
    </div>
)

export default Header;