import {useContext, useEffect} from 'react';

import {DietContext} from '../../contexts/diet.context';

import './diet-item.styles.scss';

const DietItem = ({foodItem}) => {
  const {name, quantity, kcal, protein, carbs, fat} = foodItem;
  const {foodItems} = useContext (DietContext);
  const {clearFoodFromDiet, addFoodToDiet, removeFoodFromDiet} = useContext (
    DietContext
  );

  const clearFoodHandler = () => {
    clearFoodFromDiet (foodItem.id);
  };

  return (
    <div className="checkout-item-container">
      <div className="macros-data">
        <span>
          {name}{', '}{quantity * 100}G
        </span>
      </div>
      <div className="macros-data">
        <span>{(quantity * kcal).toFixed (0)}</span>
      </div>
      <div className="macros-data">
        <span>{(quantity * protein).toFixed (0)}</span>
      </div>
      <div className="macros-data">
        <span>{(quantity * carbs).toFixed (0)}</span>
      </div>
      <div className="macros-data">
        <span>{(quantity * fat).toFixed (0)}</span>
      </div>

      <div className="remove-button" onClick={clearFoodHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default DietItem;
