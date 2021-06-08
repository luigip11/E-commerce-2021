import React from 'react';

import FormInput from '../../components/form-input/form-input.component';

import CustomButton from '../../components/custom-button/custom-button.component';

import './sign-in.styles.scss';

//class component poichè dobbiamo memorizzare ciò che l'utente sta digitando

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = e => {
      e.preventDefault();

      this.setState({ email:'', password:'' })
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>Hai già un account?</h2>
                <span>Accedi con la tua mail e password!</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="email" 
                    type="email" 
                    value={this.state.email}
                    handleChange={this.handleChange} 
                    label='E-mail'
                    required />
                    

                    <FormInput 
                    name="password" 
                    type="password" 
                    value={this.state.password}
                    handleChange={this.handleChange} 
                    label='Password'
                    required />
                    

                    <CustomButton type="submit"> Invia </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;
