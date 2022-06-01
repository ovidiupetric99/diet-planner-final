import {useContext} from 'react';

import {CartContext} from '../../contexts/cart.context';

import './diet-item.styles.scss';

const DietItem = ({cartItem}) => {
  const {name, kcal, quantity} = cartItem;
  const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext (
    CartContext
  );

  const clearItemHandler = () => {
    clearItemFromCart (cartItem);
  };

  const addItemHandler = () => addItemToCart (cartItem);
  const removeItemHandler = () => removeItemFromCart (cartItem);

  return (
    <div className="checkout-item-container">
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className="price">{quantity * kcal}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default DietItem;
