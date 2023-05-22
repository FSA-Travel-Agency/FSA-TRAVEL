import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutItem from './CheckoutItem';
import StripeContainer from './Stripe/StripeContainer';
import { fetchCart } from '../../store/addCart';

const Checkout = () => {
  const dispatch = useDispatch;

  const cart = useSelector((state) => state.addCartReducer);
  const userId = useSelector((state) => state.auth.id);

  return (
    <div className='checkout'>
      <div className='checkout-item'>
        <h2>Please enter your payment info:</h2>
        <div className='checkout-payment'>
          <StripeContainer />
        </div>
      </div>
      <div className='checkout-item'>
        <h2>Your Flights:</h2>
        <div className='checkout-items'>
          {cart.map((item) => (
            <CheckoutItem
              item={item}
              id={userId}
              fetchCart={fetchCart}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
