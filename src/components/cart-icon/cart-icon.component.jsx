import {useContext} from 'react';

import {DietContext} from '../../contexts/diet.context';

import {ReactComponent as PlateIcon} from '../../assets/farfurieneagra.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const {isDietOpen, setIsDietOpen, dietCount} = useContext (DietContext);

  const toggleIsDietOpen = () => setIsDietOpen (!isDietOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsDietOpen}>
      <PlateIcon className="plate-icon" />
      {dietCount == 0
        ? <span className="item-count">{dietCount.toFixed (0)} kcal</span>
        : <div className="item-count">
            <span>{dietCount.toFixed (0)}</span>
          </div>}
    </div>
  );
};

export default CartIcon;
