import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
    super();

    this.state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("Attenzione! Le password inserite non sono uguali!");
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });                       //pulisce il form di registrazione

        } catch (error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name] : value});
    };

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>Non hai un account?</h2>
                <span>Registrati con la tua mail e password!</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                      type='text'
                      name='displayName'
                      value={displayName}
                      onChange={this.handleChange}
                      label='Username'
                      required
                    />
                    <FormInput
                      type='email'
                      name='email'
                      value={email}
                      onChange={this.handleChange}
                      label='E-mail'
                      required
                    />
                    <FormInput
                      type='password'
                      name='password'
                      value={password}
                      onChange={this.handleChange}
                      label='Password'
                      required
                    />
                    <FormInput
                      type='password'
                      name='confirmPassword'
                      value={confirmPassword}
                      onChange={this.handleChange}
                      label='Conferma Password'
                      required
                    />
                    <div className='buttons'>
                    <CustomButton type='submit'> Registrati </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;