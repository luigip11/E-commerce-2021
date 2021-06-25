import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

//class component poichè dobbiamo memorizzare ciò che l'utente sta digitando

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials ] = useState({ email: '', password: '' })
    
  const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        
        emailSignInStart(email, password);
      };

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    };
 
        return (
            <div className='sign-in'>
                <h2>Hai già un account?</h2>
                <span>Accedi con la tua mail e password!</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                    name='email' 
                    type='email' 
                    value={email}
                    handleChange={handleChange} 
                    label='E-mail'
                    required />
                    
                    <FormInput 
                    name='password' 
                    type='password' 
                    value={password}
                    handleChange={handleChange} 
                    label='Password'
                    required />
                    
                    <div className='buttons'>
                    <CustomButton type='submit'> Accedi </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> 
                      Accedi con Google 
                    </CustomButton>
                    </div>
                </form>
            </div>
        );
    }

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
      dispatch(emailSignInStart({ email, password }))
});

export default connect(
    null,
    mapDispatchToProps
  )(SignIn);
