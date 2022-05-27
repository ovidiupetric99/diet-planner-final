import {useContext} from 'react';

import {CartContext} from '../../contexts/cart.context';

import DietItem from '../../components/diet-item/diet-item.component';

import './diet.styles.scss';

const Diet = () => {
  const {cartItems, cartCount} = useContext (CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Foodstuff</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Kcal</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map (cartItem => (
        <DietItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total Kcals: {cartCount}</span>
    </div>
  );
};

export default Diet;
