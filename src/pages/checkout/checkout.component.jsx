import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
              <span>Prodotto</span>
            </div>
            <div className='header-block'>
              <span>Descrizione</span>
            </div>
            <div className='header-block'>
              <span>Quantità</span>
            </div>
            <div className='header-block'>
              <span>Prezzo</span>
            </div>
            <div className='header-block'>
              <span>Rimuovi</span>
            </div>
        </div>
        {
          cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))
        }

        <div className='total'>
          <span>TOTALE: €{total}</span>
        </div>
        <div className='test-warning'>
           <p align='center'>*Perfavore usa i dati reali della carta di credito per i pagamenti*</p>
           {/* <br /> */}
           <p align='center'>1234 1234 1234 1234 - Sca: 01/22 - CVV: 123</p>
        </div>
        <StripeCheckoutButton price={total} />
    </div>
);

const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect (mapStateToProps)(CheckoutPage);