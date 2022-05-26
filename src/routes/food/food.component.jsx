import {useContext} from 'react';

import {ProductsContext} from '../../contexts/products.context';
import PorductCard from '../../components/product-card/product-card.component';

import './food.styles.scss';

const Food = () => {
  const {products} = useContext (ProductsContext);

  return (
    <div className="products-container">
      {products.map (product => (
        <PorductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Food;
