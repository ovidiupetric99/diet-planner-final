import './food-element.styles.scss';

import {useContext, useEffect} from 'react';
import {FoodContext} from '../../contexts/food.context';

/* console.log (props.foodData);
        console.log (props.foodData.description);
        console.log (props.foodData.brandName);
        console.log (
          props.foodData.foodNutrients[0].nutrientName +
            ': ' +
            props.foodData.foodNutrients[0].value
        );
        console.log (
          props.foodData.foodNutrients[1].nutrientName +
            ': ' +
            props.foodData.foodNutrients[1].value
        );
        console.log (
          props.foodData.foodNutrients[2].nutrientName +
            ': ' +
            props.foodData.foodNutrients[2].value
        );
        console.log (
          props.foodData.foodNutrients[3].nutrientName +
            ': ' +
            props.foodData.foodNutrients[3].value
        );
      }} */

const FoodElement = props => {
  const {setFood} = useContext (FoodContext);

  const addItemToDiet = () => {
    setFood (props.foodData);
  };

  return (
    <li className="food-element" onClick={addItemToDiet}>
      <h2>
        {props.foodData.description}
      </h2>
      <h4>
        {props.foodData.brandName}
      </h4>
      <span>
        {props.foodData.foodNutrients[3]
          ? props.foodData.foodNutrients[3].value
          : 0}
        {' '}
        calories per serving
      </span>
    </li>
  );
};

export default FoodElement;
