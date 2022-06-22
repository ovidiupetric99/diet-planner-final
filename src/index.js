import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';

import './index.scss';
import App from './App';

import {UserProvider} from './contexts/user.context';
import {FoodProvider} from './contexts/food.context';
import {DietProvider} from './contexts/diet.context';
import {MealProvider} from './contexts/meal.context';
import {stripePromise} from './utils/stripe/stripe.utils';

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  <BrowserRouter>
    <UserProvider>
      <MealProvider>
        <FoodProvider>
          <DietProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </DietProvider>
        </FoodProvider>
      </MealProvider>
    </UserProvider>
  </BrowserRouter>
);
