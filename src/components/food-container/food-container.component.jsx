import FoodElement from '../food-element/food-element.component';
import './food-container.styles.scss';

let sortedArray;

const FoodContainer = props => {
  if (props.foods) {
    sortedArray = props.foods.sort ((a, b) => a.score + b.score);

    sortedArray = sortedArray.filter (
      el =>
        el.foodNutrients[0] ||
        el.foodNutrients[1] ||
        el.foodNutrients[2] ||
        el.foodNutrients[3]
    );
  }

  return (
    <div>
      <ul className="scrollable">
        {sortedArray &&
          sortedArray.map (el => <FoodElement key={el.fdcId} foodData={el} />)}
      </ul>
    </div>
  );
};

export default FoodContainer;
