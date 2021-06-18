import React from 'react';

// import './custom-button.styles.scss';

import { CustomButtonContainer } from './custom-button.styles';

//nelle quadre del functional component sono dichiarate le props
//isGoogleSignIn viene reso condizionale usando l'interpolazione `` di stringhe
//isGoogleSignIn quindi diventa una prop vera, altrimenti ci sarà una stringa vuota

const CustomButton = ({ children, ...props }) => (
    <CustomButtonContainer {...props}>                 
        {children}
    </CustomButtonContainer>
);

export default CustomButton;
