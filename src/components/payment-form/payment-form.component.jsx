import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { UserContext } from '../../contexts/user.context';
import { useContext, useState, useEffect } from 'react';
import './payment-form.styles.scss';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import ButtonSpinner from '../button-spinner/button-spinner.compoent';
import {
  currentUserSnapshot,
  editUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = currentUser;
  const [userName, setUserName] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const paymentHandler = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 2000 }),
    }).then(res => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userName ? userName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status == 'succeeded') {
        alert('Payment Successful');
        try {
          await editUserDocumentFromAuth(user, {
            premium: true,
          });
        } catch (error) {
          console.log(
            'Updgrade account to premium encountered and error: ',
            error
          );
        }
        setCurrentUser(user);
        navigate('/');
      }
    }
  };

  useEffect(
    () => {
      currentUserSnapshot(user).then(r => {
        if (r) {
          setUserName(r.displayName);
        }
      });
    },
    [user]
  );

  useEffect(
    () => {
      if (userName) {
        setCurrentUser(currentUser);
      }
    },
    [userName]
  );

  return (
    <div className="container">
      <h1>
        Buy premium version!
      </h1>
      <h3>
        Premium version allows you to configure however you like your macros.
      </h3>
      <h3>Price: 20$</h3>
      <div className="payment-form-container">
        <form className="form-container" onSubmit={paymentHandler}>
          <h2>Credit Card Payment: </h2>
          <CardElement />
          <Button disabled={isProcessingPayment}>
            {isProcessingPayment ? <ButtonSpinner /> : ' Pay Now '}
          </Button>
        </form>
      </div>
      <div className="test-container">
        <span style={{ color: 'red' }}> Payment is working just on netlify local server (start with command: netlify dev) </span>
        <span style={{ color: 'red' }}> For test: </span>
        <span style={{ color: 'red' }}>
          Card number: 4242 4242 4242 4242
        </span>
        <span style={{ color: 'red' }}>
          MM/YY anything from future
        </span>
        <span style={{ color: 'red' }}>
          CVC can be any number
        </span>
      </div>
    </div>
  );
};

export default PaymentForm;
