import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {CartContext} from '../../contexts/cart.context';

import Button from '../../components/button/button.component';
import DietItem from '../../components/diet-item/diet-item.component';

import './diet.styles.scss';

const Diet = () => {
  const {cartItems, cartCount} = useContext (CartContext);
  const navigate = useNavigate ();

  const goToFoodHandler = () => {
    navigate ('/food');
  };
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Foodstuff</span>
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
      <br />
      <Button onClick={goToFoodHandler}>
        Add Foods
      </Button>
      <span className="total">Total Kcals: {cartCount}</span>
    </div>
  );
};

export default Diet;
