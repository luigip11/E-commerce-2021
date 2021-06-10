import React from 'react';

import './sign-in-and-sign-up.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

//functional component poichè i component di accesso, reg., ecc. saranno mantenuti qui

const SignInAndSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>

);

export default SignInAndSignUpPage;