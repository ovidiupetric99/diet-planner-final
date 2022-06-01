import './cart-item.styles.scss';

const CartItem = ({cartItem}) => {
  const {name, imageUrl, quantity} = cartItem;
  return (
    <div className="cart-item-container">

      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
      </div>
      <span>{`${quantity} x servings`}</span>
    </div>
  );
};

export default CartItem;
