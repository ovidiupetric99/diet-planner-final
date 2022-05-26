import './product-card.styles.scss';

import Button from '../button/button.component';

const PorductCard = ({product}) => {
  const {name, imageUrl, kcal, protein, carbohidrates, fats} = product;
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
      <Button buttonType="inverted">Add to diet</Button>
    </div>
  );
};

export default PorductCard;
