import React from 'react';

import './custom-button.styles.scss';

//nelle quadre del functional component sono dichiarate le props
//isGoogleSignIn viene reso condizionale usando l'interpolazione `` di stringhe
//isGoogleSignIn quindi diventa una prop vera, altrimenti ci sarà una stringa vuota

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    <button 
    className={`${isGoogleSignIn ? 'google-sign-in': '' } custom-button`} 
    {...otherProps}
    >                 
        {children}
    </button>
);

export default CustomButton;
