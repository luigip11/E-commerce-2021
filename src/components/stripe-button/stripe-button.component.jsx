import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J30mzHbYR94mFrLBCEofc8bjL13k8NBTNDm7s1zfbNzpOeRicuiJiY0IqSzit9ubbZkTC2woDSBItewKjB9hhfz008bF8u02j';
    
    const onToken = token => {
        console.log(token);
        alert('Pagamento avvenuto con successo!');
    };

    return (
        <StripeCheckout
            label='Paga ora'
            name='LP Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Il tuo totale è €${price}`}
            amount={priceForStripe}
            panelLabel='Paga ora'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;