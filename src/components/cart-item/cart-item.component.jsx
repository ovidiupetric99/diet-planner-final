import './cart-item.styles.scss';

const CartItem = ({foodItem}) => {
  return (
    <div className="cart-item-container">
      <div className="item-details">
        <span className="name">{foodItem.name}</span>
        <span>{`${(foodItem.quantity * 100).toFixed (0)} grams`}</span>
      </div>

    </div>
  );
};

export default CartItem;
