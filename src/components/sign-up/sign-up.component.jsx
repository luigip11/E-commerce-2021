import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Attenzione! Le password inserite non sono uguali!");
            return;
        }

        signUpStart({ displayName, email, password });
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name] : value});
    };

        return(
            <div className='sign-up'>
                <h2 className='title'>Non hai un account?</h2>
                <span>Registrati con la tua mail e password!</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                      type='text'
                      name='displayName'
                      value={displayName}
                      onChange={handleChange}
                      label='Username'
                      required
                    />
                    <FormInput
                      type='email'
                      name='email'
                      value={email}
                      onChange={handleChange}
                      label='E-mail'
                      required
                    />
                    <FormInput
                      type='password'
                      name='password'
                      value={password}
                      onChange={handleChange}
                      label='Password'
                      required
                    />
                    <FormInput
                      type='password'
                      name='confirmPassword'
                      value={confirmPassword}
                      onChange={handleChange}
                      label='Conferma Password'
                      required
                    />
                    <div className='buttons'>
                    <CustomButton type='submit'> Registrati </CustomButton>
                    </div>
                </form>
            </div>
        );
    }

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
  });
  
export default connect(
    null,
    mapDispatchToProps
  )(SignUp);