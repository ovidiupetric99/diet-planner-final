import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {DietContext} from '../../contexts/diet.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const {foodItems} = useContext (DietContext);
  const navigate = useNavigate ();

  const goToDietHandler = () => {
    navigate ('/diet');
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {foodItems.map ((foodItem, i) => (
          <CartItem key={i} foodItem={foodItem} />
        ))}
      </div>
      <Button onClick={goToDietHandler}>Go to edit diet</Button>
    </div>
  );
};

export default CartDropdown;
