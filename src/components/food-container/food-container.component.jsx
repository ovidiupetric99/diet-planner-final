import {useEffect, useState} from 'react';

import FoodElement from '../food-element/food-element.component';
import './food-container.styles.scss';

let sortedArray;

const FoodContainer = props => {
  const [sortedFoods, setSortedFoods] = useState ([]);

  if (props.foods) {
    sortedArray = props.foods.sort ((a, b) => a.score + b.score);
  }

  useEffect (
    () => {
      if (props.foods) {
        setSortedFoods (sortedArray);
      } else {
        setSortedFoods (null);
      }
    },
    [props]
  );

  return (
    <div>
      <ul className="scrollable">
        {sortedFoods &&
          sortedFoods.map (el => <FoodElement key={el.fdcId} foodData={el} />)}
      </ul>
    </div>
  );
};

export default FoodContainer;
