import {useContext} from 'react';

import './product-card.styles.scss';

import Button from '../button/button.component';
import {CartContext} from '../../contexts/cart.context';

const PorductCard = ({product}) => {
  const {name, imageUrl, kcal, protein, carbohidrates, fats} = product;
  const {addItemToCart} = useContext (CartContext);

  const addProductToCart = () => addItemToCart (product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="Kcal">{kcal}</span>
        <span className="Protein">{protein}</span>
        <span className="Carbohidrates">{carbohidrates}</span>
        <span className="Fats">{fats}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to diet
      </Button>
    </div>
  );
};

export default PorductCard;
